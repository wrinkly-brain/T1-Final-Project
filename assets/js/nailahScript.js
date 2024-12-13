import axios from "axios";

axios
    .get(
           "https://api.nasa.gov/planetary/apod"
    )
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });