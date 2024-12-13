// window.onload = getCertainStuffFromAPI();

// async function getCertainStuffFromAPI() {
//     try {
//         const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=xAP1HKs1wN8evwCa3vQjye47l8WBGVtcM5UFtTT8&date=2024-12-12");

//         console.log(response);

//         console.log(response.copywrite);
//     } catch (error) {
//         console.log(error);
//     }
// }


// // Specify the API endpoint for user data
// const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=xAP1HKs1wN8evwCa3vQjye47l8WBGVtcM5UFtTT8&date=2024-12-12';

// // Make a GET request using the Fetch API
// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(userData => {
//     // Process the retrieved user data
//     console.log('User Data:', userData);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

 
$(document).ready(function (){
    fetchNasa()
});

function fetchNasa(){

    $.ajax({
        url: "https://api.nasa.gov/planetary/apod?api_key=xAP1HKs1wN8evwCa3vQjye47l8WBGVtcM5UFtTT8",
        type: "GET",
        dataType: "json",
        success: function(data) {
           let copyRight =  data.copyright;
           let date = data.date;
           let explanation = data.explanation;
           let media_type = data.media_type;
           let title = data.title;
           let url = data.url;
           console.log(copyRight)
           console.log(date)
           console.log(explanation)
           console.log(media_type)
           console.log(title)
           console.log(url)
        }

    })
}