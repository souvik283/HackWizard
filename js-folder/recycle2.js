// const Model_URL = "https://teachablemachine.withgoogle.com/models/xugPJMxVd/";
// const Model_URL = "https://teachablemachine.withgoogle.com/models/18M41aqGw/";
const Model_URL = "https://teachablemachine.withgoogle.com/models/Pdk1B5kDx/";

// const Model_URL = "https://teachablemachine.withgoogle.com/models/Pdk1B5kDx/";
let model, labelContainer, maxPredictions, imageElement;

// Load model on page load
async function init() {
    const modelURL = Model_URL + "model.json";
    const metadataURL = Model_URL + "metadata.json";

    try {
        // load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ""; // clear any old labels
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
        console.log("✅ Model loaded");
    } catch (err) {
        console.error("Error loading model:", err);
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

        // Run prediction after image is loaded & model is ready
        imageElement.onload = async () => {
            if (!model) {
                console.warn("Model not ready yet, reloading...");
                await init();
            }
            predict();
        };
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Run prediction
async function predict() {
    if (!model || !imageElement) {
        console.error("Prediction skipped: model or image not ready.");
        return;
    }

    try {
        const prediction = await model.predict(imageElement);
        const arr = []
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            // console.log(classPrediction);
            arr[i] =
            {
                percent: prediction[i].probability.toFixed(2) * 100,
                type: prediction[i].className
            }
            // show result in label container
            // labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        console.log(arr)
        let key = arr[0].percent;
        let wastetype = arr[0].type
        for (let i = 0; i < (arr.length); i++) {
            // console.log(arr[i]);
            if (arr[i].percent > key) {
                key = arr[i].percent
                wastetype = arr[i].type
            }
        }
        console.log(key, wastetype)
        let waste_type = document.getElementById("waste-type")

        waste_type.value = wastetype
        // console.log(waste_type.value)
let submit_button = document.getElementById("recycle_btn")

        if (wastetype == "Not Recyclable") {
            submit_button.disabled = true;
            submit_button.style.cursor = "not-allowed"
            submit_button.style.backgroundColor = "#dbdbdbff"
        } else {
            submit_button.disabled = false;
            submit_button.style.cursor = "pointer"
            submit_button.style.backgroundColor = "#62ad37ff"
            submit_button.addEventListener("mouseover", () => {
                submit_button.style.backgroundColor = "#e4c114ff"
            })
            submit_button.addEventListener("mouseout", () => {
                submit_button.style.backgroundColor = "#62ad37ff"
            })
        }
    } catch (err) {
        console.error(" Error during prediction:", err);
    }
}

// Initialize model when page loads
window.onload = init();
