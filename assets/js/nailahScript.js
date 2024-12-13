fetch("https://api.nasa.gov/planetary/apod?api_key=xAP1HKs1wN8evwCa3vQjye47l8WBGVtcM5UFtTT8")
    .then(response => console.log(response))
    .catch(error => console.error(error));

