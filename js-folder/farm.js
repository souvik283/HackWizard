//location function 
document.getElementById('get-location').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('location').value = `Lat: ${latitude}, Lon: ${longitude}`;
        }, function() {
            alert('Unable to retrieve your location. Please allow location access.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});





document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.querySelector('.btn-submit');
  
    signUpButton.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent page reload
  
      // Collect user data from input fields
      const userData = {
        address: document.getElementById('address')?.value || '',
        landArea: document.getElementById('land-area')?.value || '',
        wasteWeight: document.getElementById('waste-weight')?.value || '',
        comment: document.getElementById('comment')?.value || '',
        location: document.getElementById('location')?.value || ''
      };
  
      // Simple validation
      if (!userData.address || !userData.landArea || !userData.wasteWeight || !userData.comment || !userData.location) {
        alert('All fields are required!');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:8080/farm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData) // Convert to JSON
        });
  
        // Check if the response has content
        const result = response.headers.get("content-length") !== "0" ? await response.json() : null;
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
  
        console.log('Farm request Successful:', result);
        alert('Farm request successful!');
  
      } catch (error) {
        console.error('Error:', error.message);
        alert('request failed. Try again.');
      }
    });
  });
  
  
  