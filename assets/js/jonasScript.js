// Store button info to use in functions
const latestButtonInfo = {
    buttonName: "",
    buttonClass: "",
}

const RoverButtons = document.querySelectorAll(".RoverButtons");

// Listen for a click of a rover button to store that button's information in the latestButtonInfo object
RoverButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const response = event;

        // Take the name of the button and the class and store it in the latestButtonInfo object
        latestButtonInfo.buttonName = response.target.innerHTML;
        latestButtonInfo.buttonClass = response.target.className;
    }
)});