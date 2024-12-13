fetch("https://api.nasa.gov/planetary/apod?api_key=xAP1HKs1wN8evwCa3vQjye47l8WBGVtcM5UFtTT8&date")
    .then(response => console.log(response))
    .catch(error => console.error(error));

// req.addEventListener("load", function(){
//     if(req.status == 200){
//         let response = JSON.parse(req.responseText);
//         document.getElementById("title").textContent = response.title;
//         document.getElementById("date").textContent = response.date;
//         document.getElementById("picture").src = response.hdurl;
//         document.getElementById("explanation").textContent = response.explanation;
//     }
// })