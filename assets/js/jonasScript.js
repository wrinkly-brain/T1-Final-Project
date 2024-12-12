// Store button info to use in functions
const latestButtonInfo = {
    buttonID: "",
    buttonClass: "",
}

const uriLinkSegments = {
    solNum: 0,
    rover: "",
    cameraAngle: "",
}

const RoverButtons = document.querySelectorAll(".RoverButtons");
const CameraButtons = document.querySelectorAll(".CameraButtons");

// Listen for a click of a rover button to store that button's information in the latestButtonInfo object
RoverButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const response = event;

        // Take the id of the button and the class and store it in the latestButtonInfo object
        latestButtonInfo.buttonID = response.target.id;
        latestButtonInfo.buttonClass = response.target.className;

        uriLinkSegments.rover = response.target.id.toLowerCase();

        console.log(uriLinkSegments);
    }
)});

// Same function as the RoverButton listener, but it's for the camera buttons
CameraButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const response = event;

        // Take the id of the button and the class and store it in the latestButtonInfo object
        latestButtonInfo.buttonID = response.target.id;
        latestButtonInfo.buttonClass = response.target.className;

        uriLinkSegments.cameraAngle = response.target.id;

        console.log(uriLinkSegments);
    }
)});


