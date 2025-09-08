// Purpose: To provide the functionality for the cleaning page
//upload image function
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

//Display the selected image
function previewImage(event) {
    const preview = document.getElementById('preview');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}



//map function
let map;
let marker;

function initMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView([lat, lon], 13);
    }

    if (marker) {
        marker.remove();
    }
    
    marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup("You are here!").openPopup();
}
//location function 
document.getElementById('get-location').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('location').value = `${latitude}, ${longitude}`;
        }, function() {
            alert('Unable to retrieve your location. Please allow location access.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
//    const submitbtn=document.getElementsByClassName('submit-btn');
//    submitbtn[0].style.display='block';
//     submitbtn[0].style.marginLeft='150px';



//argha's code

document.addEventListener('DOMContentLoaded', () => {
  // Variables to store the selected image
  let selectedImage = null;
  
  // Function to handle when an image is selected
  function handleImageSelect(event) {
    selectedImage = event.target.files[0];
    console.log("Image selected:", selectedImage.name);
  }
  
  // Connect image select handler to the file input
  const imageInput = document.getElementById('fileInput');
  if (imageInput) {
    fileInput.addEventListener('change', handleImageSelect);
  }
  
  const submitButton = document.querySelector('.submit-btn');
  
  if (submitButton) {
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent page reload
      
      // Check if an image was selected
      if (!selectedImage) {
        console.log("Please select an image first");
        return;
      }
      
      // Get comment and location values from form

      const nameInput = document.getElementById('name');
      const commentInput = document.getElementById('comment');
      const locationInput = document.getElementById('location');
      
      const name = nameInput ? nameInput.value : '';
      const comment = commentInput ? commentInput.value : '';
      const location = locationInput ? locationInput.value : '';
      
      // Validate required fields
      if (!comment) {
        alert("Please enter a comment");
        return;
      }
      
      try {
        // Compress the image before uploading
        const compressedImage = await compressImage(selectedImage);
        console.log("Original size:", selectedImage.size, "bytes");
        console.log("Compressed size:", compressedImage.size, "bytes");
        
        // Create FormData object for multipart/form-data submission
        const formData = new FormData();
        
        // Add the compressed image file
        formData.append("imageFile", compressedImage);
        
        // Create Clean object with required fields
        const recycleData = {
            name : name,
          comment: comment,
          location: location
        };
        
        formData.append("clean", new Blob([JSON.stringify(recycleData)], { type: "application/json" }));
        
        console.log("Sending request to server...");
        const response = await fetch('http://localhost:8080/clean', {
          method: 'POST',
          body: formData
        });
        
        console.log("Server response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server error response:", errorText);
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        console.log("clean request submitted succceaafullly", result);
        alert("clean request submitted successfully");
        
      } catch (error) {
        console.error('Detailed error information:', error);
        alert(`Upload failed: ${error.message}. Check console for details.`);
      }
    });
  }
  
  // Function to compress an image
  async function compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = function() {
          // Create a canvas to draw the compressed image
          const canvas = document.createElement('canvas');
          
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          
          // Limit max dimensions to 1200px (adjust as needed)
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          
          if (width > height && width > MAX_WIDTH) {
            height = Math.round(height * MAX_WIDTH / width);
            width = MAX_WIDTH;
          } else if (height > MAX_HEIGHT) {
            width = Math.round(width * MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw the image on canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to blob with compression
          canvas.toBlob(
            (blob) => {
              // Create a new file from the blob
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              
              resolve(compressedFile);
            },
            'image/jpeg',
            0.7  // Quality: 0.7 = 70% quality, adjust as needed
          );
        };
        
        img.onerror = function(error) {
          reject(error);
        };
      };
      
      reader.onerror = function(error) {
        reject(error);
      };
    });
  }
});
