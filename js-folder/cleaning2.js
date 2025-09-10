// const Model_URL = "https://teachablemachine.withgoogle.com/models/xugPJMxVd/";
const Model_URL = "https://teachablemachine.withgoogle.com/models/18M41aqGw/";
let model, labelContainer, maxPredictions, imageElement;
let submit_button = document.getElementById("submit-btn")

// Load model on page load
async function init() {
    const modelURL = Model_URL + "model.json";
    const metadataURL = Model_URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

// Function to load image from input
function loadImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const imgContainer = document.getElementById("image-container");
        imgContainer.innerHTML = ""; // clear previous image
        imageElement = document.createElement("img");
        imageElement.src = reader.result;
        imageElement.width = 200;
        imageElement.height = 200;
        imgContainer.appendChild(imageElement);

        // Run prediction after image is loaded
        imageElement.onload = predict;
    };
    reader.readAsDataURL(event.target.files[0]);
}
let descrip_txt = document.getElementById("description")
// Run prediction
async function predict() {
    const prediction = await model.predict(imageElement);
    console.log((prediction[0].probability.toFixed(2)) * 100)
    // for (let i = 0; i < maxPredictions; i++) {

    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    if (((prediction[0].probability.toFixed(2)) * 100) > 90) {
        descrip_txt.innerHTML = ""
        submit_button.disabled = false;
        submit_button.style.cursor = "pointer"
        submit_button.style.backgroundColor = "#62ad37ff"
        submit_button.addEventListener("mouseover", ()=>{
            submit_button.style.backgroundColor= "#e4c114ff"
        })
        submit_button.addEventListener("mouseout", ()=>{
            submit_button.style.backgroundColor= "#62ad37ff"
        })
    }
    else if (((prediction[0].probability.toFixed(2)) * 100) >= 75 && ((prediction[0].probability.toFixed(2)) * 100) <= 90) {
        descrip_txt.innerHTML = "** Image is not clear, Please take a clear image **"
        submit_button.disabled = true;
        submit_button.style.cursor = "not-allowed"
        submit_button.style.backgroundcolor = "#d8d8d8ff"
    } else if (((prediction[0].probability.toFixed(2)) * 100) < 75) {
        descrip_txt.innerHTML = "** It is clearly not a waste **"
        submit_button.disabled = true;
        submit_button.style.cursor = "not-allowed"
        submit_button.style.backgroundColor = "#dbdbdbff"
    }

}

// Initialize model when page loads
window.onload = init;