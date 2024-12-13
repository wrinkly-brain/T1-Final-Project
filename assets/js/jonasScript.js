// Store button info to use in functions
let photoArray = [];

let maxSol = 0;
let indexValue = 0;

const uriLinkSegments = {
    solNum: 0,
    cameraAngle: "",
    apiKey: "qUb2gjOCMIuMLu4Cd49cA9FhDHdYPyRuGpaOYTn2"
}

const CameraButtons = document.querySelectorAll(".CameraButtons");
const CarouselButtons = document.querySelectorAll(".CarouselButtons");

// Since Curiosity is still operational, it is necessary to check for the max sol value that can be entered. This allows the user to have updated information
window.onload = getMaxSol();
window.onload = disableCarouselButtons();
window.onload = disableApplyChangesButton();

// Listen for a click of a camera button to store that button's information in the uriLinkSegments object
CameraButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const response = event;

        uriLinkSegments.cameraAngle = response.target.id;

        endableApplyChangesButton();
    });
});

CarouselButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const stepValue = validateStepValue();

        if (stepValue == "error") {
            return;
        }

        const responseButtonName = event.target.innerHTML;

        if (responseButtonName == "Next") {
            console.log(indexValue);
            nextIndex(stepValue);
        }
        else {
            prevIndex(stepValue);
        }

        displayImageAmountAndIndex();
        displayImage(indexValue);
    });
});

// Invokes several functions to ultimately display the images associated with the settings changes
document.getElementById("ApplyChanges").onclick = async () => {
    const userInputSol = document.getElementById("SolNum").value;

    // Reset index value
    indexValue = 0;

    // maxSol is subtracted by 1 to make sure there are uploaded photos
    if ((userInputSol >= 0) && (userInputSol < (maxSol - 1))) {
        uriLinkSegments.solNum = Number(userInputSol);
    }
    else {
        uriLinkSegments.solNum = 0;
    }

    clearPhotoArray();
    clearPhotoAndText();

    await getRoverImages()

    const photoExistence = checkForPhotos();
    if (photoExistence == true) {
        console.log("test")
        // Allow the user to change the picture
        enableCarouselButtons();

        displayImageAmountAndIndex();
        displayImage(indexValue);
    }
    else {
        displayImageAmountAndIndex();
        disableCarouselButtons();
        return;
    }
}

// Uses api key to fetch max sol data from the api
async function getMaxSol() {
    const apiKey = uriLinkSegments.apiKey;

    try {
        const roverDataResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity?api_key=${apiKey}`);
        console.log(roverDataResponse);

        maxSol = roverDataResponse.data.rover.max_sol;
    } catch (error) {
        console.log(error);
        alert("An error has occurred. Please reload the page.");
    }
}

// Uses properties in uriLinkSegments to construct a uri link. Then, using the constructed uri, photoArray is filled with the response from the api
async function getRoverImages() {
    const chosenCamera = uriLinkSegments.cameraAngle;
    const apiKey = uriLinkSegments.apiKey;
    const solNum = uriLinkSegments.solNum;


    // MARDI cam can only have a solNum of 0 since those pictures are of the landing descent
    try {
        const roverPhotoResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&camera=${chosenCamera}&sol=${solNum}`);

        console.log(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&camera=${chosenCamera}&sol=${solNum}`);
        console.log(roverPhotoResponse);

        roverPhotoResponse.data.photos.forEach(photo => {
            photoArray.push(photo.img_src);
        })

        console.log(photoArray);
        return photoArray;
    } catch (error) {
        console.log(error)
        alert("Something went wrong when fetching images for that camera. Please try again.");
        return;
    }
}

// Takes an image at a certain index in the and change the img's src attribute
function displayImage(index) {
    document.getElementById("RoverImage").setAttribute("src", `${photoArray[index]}`);
}

// Check if the photo array has any items. If so, it clears the array to prepare for a new set of images
function clearPhotoArray() {
    if (photoArray.length > 0) {
        photoArray = [];
    }
}

// Checks for an image in the array. If the array is empty, it displays error text.
function checkForPhotos() {
    if (photoArray.length == 0) {
        document.getElementById("ImageErrorText").textContent = "No images can be found using those settings.\r\nTry changing the camera view or solar day value.";
        return false;
    }
    else {
        return true;
    }
}


// Clears the photo to prepare for another photo. Removes error text if there is error text on screen
function clearPhotoAndText() {
    document.getElementById("RoverImage").setAttribute("src", "");

    if (document.getElementById("ImageErrorText").innerHTML) {
        document.getElementById("ImageErrorText").textContent = "";
    }
}

function validateStepValue() {
    const stepInput = Number(document.getElementById("CarouselStep").value);

    if ((stepInput >= 1) && (!isNaN(stepInput))) {
        return stepInput;
    }
    else {
        document.getElementById("StepErrorText").textContent = "Step value invalid. Please change step value.";
        return "error";
    }
}

function nextIndex(stepValue) {
    const newIndex = indexValue + stepValue;

    if (newIndex < photoArray.length) {
        indexValue = newIndex;
        document.getElementById("StepErrorText").textContent = "";
    }
    else {
        document.getElementById("StepErrorText").textContent = "Invalid action.\r\nPlease change step value or go backwards.";
        return;
    }
}

function prevIndex(stepValue) {
    const newIndex = indexValue - stepValue;

    if (newIndex >= 0) {
        indexValue = newIndex;
        document.getElementById("StepErrorText").textContent = "";
    }
    else {
        document.getElementById("StepErrorText").textContent = "Invalid action.\r\nPlease change step value or go forwards.";
        return;
    }
}

function disableCarouselButtons() {
    const NextButton = document.getElementById("NextButton");
    const PrevButton = document.getElementById("PrevButton");

    PrevButton.setAttribute("disabled", "");
    NextButton.setAttribute("disabled", "");
}

function disableApplyChangesButton() {
    const ApplyChangesButton = document.getElementById("ApplyChanges");

    ApplyChangesButton.setAttribute("disabled", "");
}

function endableApplyChangesButton() {
    const ApplyChangesButton = document.getElementById("ApplyChanges");

    if (ApplyChangesButton.hasAttribute("disabled")) {
        ApplyChangesButton.removeAttribute("disabled");
    }
}

function enableCarouselButtons() {
    const NextButton = document.getElementById("NextButton");
    const PrevButton = document.getElementById("PrevButton");

    if (NextButton.hasAttribute("disabled")) {
        NextButton.removeAttribute("disabled");
    }
    if (PrevButton.hasAttribute("disabled")) {
        PrevButton.removeAttribute("disabled");
    }
}

function displayImageAmountAndIndex() {
    // I can't think of a good variable name for this
    const gallerySizeAndIndexText = `${indexValue + 1}/${photoArray.length}`

    document.getElementById("gallerySizeAndIndex").textContent = gallerySizeAndIndexText;
}