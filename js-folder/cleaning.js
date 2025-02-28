// Purpose: To provide the functionality for the cleaning page
//upload image function
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const deleteButton = document.getElementById('deleteButton');

// Display the selected image
fileInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    preview.src = imageURL;
    preview.style.display = 'block';
    deleteButton.style.display = 'inline-block';
  }
});

// Delete the image and reset input
deleteButton.addEventListener('click', function() {
  preview.src = '';
  preview.style.display = 'none';
  fileInput.value = '';
  deleteButton.style.display = 'none';
});
function submitComment() {
    const comment = document.getElementById('comment').value;
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
function getLocation() {
    const status = document.getElementById('status');
    
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
        status.className = 'status error';
        return;
    }

    status.textContent = 'Locating...';
    status.className = 'status';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            status.textContent = `Located at: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;

            status.className = 'status success';
        },
        (error) => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    status.textContent = 'User denied the request for Geolocation';
                    break;
                case error.POSITION_UNAVAILABLE:
                    status.textContent = 'Location information is unavailable';
                    break;
                case error.TIMEOUT:
                    status.textContent = 'The request to get user location timed out';
                    break;
                default:
                    status.textContent = 'An unknown error occurred';
            }
            status.className = 'status error';
        }
    );
   const submitbtn=document.getElementsByClassName('submit-btn');
   submitbtn[0].style.display='block';
    submitbtn[0].style.marginLeft='150px';
}
function displayPerview() {
    const preview = document.querySelector('.preview');
    preview.style.display = 'flex';
}
function deletePreview() {
    const preview = document.querySelector('.preview');
    preview.style.display = 'none';
}