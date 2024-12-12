// Store button info to use in functions
const latestButtonInfo = {
    buttonID: "",
    buttonClass: "",
}

const uriLinkSegments = {
    solNum: 0,
    rover: "",
    cameraAngle: "",
    apiKey: "qUb2gjOCMIuMLu4Cd49cA9FhDHdYPyRuGpaOYTn2"
}

const RoverButtons = document.querySelectorAll(".RoverButtons");
const CameraButtons = document.querySelectorAll(".CameraButtons");

// Listen for a click of a rover button to store that button's information in the latestButtonInfo object
RoverButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
        const response = event;

        // Take the id of the button and the class and store it in the latestButtonInfo object
        latestButtonInfo.buttonID = response.target.id;
        latestButtonInfo.buttonClass = response.target.className;

        uriLinkSegments.rover = response.target.id.toLowerCase();
    
        await getMaxSol();
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

async function getMaxSol() {
    const apiKey = uriLinkSegments.apiKey;
    const chosenRover = uriLinkSegments.rover;

    try {
        const roverDataResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${chosenRover}?api_key=${apiKey}`);
        console.log(roverDataResponse);

        const solData = roverDataResponse.data.rover.max_sol;
        console.log(solData);
    } catch (error) {
        console.log(error);
    }
}
