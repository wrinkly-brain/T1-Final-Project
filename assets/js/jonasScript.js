const RoverButtons = document.querySelectorAll(".RoverButtons");

RoverButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const response = event;
        console.log(response.target.innerHTML)
    }
)});