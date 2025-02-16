// Purpose: To provide the functionality for the cleaning page
//upload image function

const imageUpload = document.getElementById('image-upload');
const previewImage = document.getElementById('preview-image');

imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.style.display = 'none';
    }
});

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

}
