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

axios
    .get(
        "https://api.nasa.gov/planetary/apod?api_key=xAP1HKs1wN8evwCa3vQjye47l8WBGVtcM5UFtTT8&date=2024-12-12"
    )
    .then(function (response) {
        console.log(date);
    })
    .catch(function (error) {
        console.log(error);
    });