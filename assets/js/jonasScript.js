// Store button info to use in functions
let photoArray = [];

const tempInfo = {
    buttonID: "",
    buttonClass: "",
    maxSol: 0
}

const uriLinkSegments = {
    solNum: 0,
    rover: "",
    cameraAngle: "",
    apiKey: "qUb2gjOCMIuMLu4Cd49cA9FhDHdYPyRuGpaOYTn2"
}

const RoverButtons = document.querySelectorAll(".RoverButtons");
const CameraButtons = document.querySelectorAll(".CameraButtons");

// Listen for a click of a rover button to store that button's information in the tempInfo object
RoverButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
        const response = event;

        // Take the id of the button and the class and store it in the tempInfo object
        tempInfo.buttonID = response.target.id;
        tempInfo.buttonClass = response.target.className;

        uriLinkSegments.rover = response.target.id.toLowerCase();

        await getMaxSol();
    }
    )
});

// Same function as the RoverButton listener, but it's for the camera buttons
CameraButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const response = event;

        // Take the id of the button and the class and store it in the tempInfo object
        tempInfo.buttonID = response.target.id;
        tempInfo.buttonClass = response.target.className;

        uriLinkSegments.cameraAngle = response.target.id;

        console.log(uriLinkSegments);
    }
    )
});

document.getElementById("ApplyChanges").onclick = async () => {
    const userInputSol = document.getElementById("SolNum").value;

    console.log(tempInfo.maxSol);

    console.log(Number(userInputSol));

    console.log((Number(userInputSol) >= 0) && (Number(userInputSol) < (tempInfo.maxSol - 1)));

    // maxSol is subtracted by 1 to make sure there are uploaded photos
    if ((userInputSol >= 0) && (userInputSol < (tempInfo.maxSol - 1))) {
        uriLinkSegments.solNum = Number(userInputSol);
        console.log("uri link seg: " + uriLinkSegments.solNum);
    }
    else {
        uriLinkSegments.solNum = 0;
    }

    clearPhotoArray();
    clearPhotoAndText();

    await getRoverImages()

    const photoExistence = checkForPhotos();
    if (photoExistence == true) {
        displayImage(0);
    }
    else {
        return;
    }
}

async function getMaxSol() {
    const apiKey = uriLinkSegments.apiKey;
    const chosenRover = uriLinkSegments.rover;

    try {
        const roverDataResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${chosenRover}?api_key=${apiKey}`);
        console.log(roverDataResponse);

        tempInfo.maxSol = roverDataResponse.data.rover.max_sol;
    } catch (error) {
        console.log(error);
    }
}

async function getRoverImages() {
    const chosenRover = uriLinkSegments.rover;
    const chosenCamera = uriLinkSegments.cameraAngle;
    const apiKey = uriLinkSegments.apiKey;
    const solNum = uriLinkSegments.solNum;


    // Curiosity MARDI cam can only have a solNum of 0 since those pictures are of the landing descent
    try {
        const roverPhotoResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${chosenRover}/photos?api_key=${apiKey}&camera=${chosenCamera}&sol=${solNum}`);

        console.log(`https://api.nasa.gov/mars-photos/api/v1/rovers/${chosenRover}/photos?api_key=${apiKey}&camera=${chosenCamera}&sol=${solNum}`);
        console.log(roverPhotoResponse);

        roverPhotoResponse.data.photos.forEach(photo => {
            photoArray.push(photo.img_src);
        })

        console.log(photoArray);
        return photoArray;
    } catch (error) {
        console.log(error)
        return;
    }
}

function displayImage(index) {
    document.getElementById("RoverImage").setAttribute("src", `${photoArray[index]}`);

    const roverName = uriLinkSegments.rover;
    const capitalizedRoverName = roverName.charAt(0).toUpperCase() + roverName.slice(1);
    document.getElementById("RoverImage").setAttribute("alt", `An image from the ${capitalizedRoverName} rover.`);
}

function clearPhotoArray() {
    if (photoArray.length > 0) {
        photoArray = [];
    }
}

function checkForPhotos() {
    if (photoArray.length == 0) {
        document.getElementById("ImageErrorText").textContent = "No images can be found using those settings. \n Try changing the camera view or solar day value.";
        return false;
    }
    else {
        return true;
    }
}

function clearPhotoAndText() {
    document.getElementById("RoverImage").setAttribute("src", "");

    if (document.getElementById("ImageErrorText").innerHTML) {
        document.getElementById("ImageErrorText").textContent = "";
    }
}