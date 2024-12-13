document.addEventListener("DOMContentLoaded", function () {
    
    const apiKey = '6r7AcJAp1BCVkoVGRrN01elIpw7pLkWRcUfMsH9Q';
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;
    
    async function loadRandomNEO() {
        try {
            
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data && data.near_earth_objects && data.near_earth_objects.length > 0) {
                
                const randomNEO = data.near_earth_objects[Math.floor(Math.random() * data.near_earth_objects.length)];
                const name = randomNEO.name;
                const distanceFromEarth = randomNEO.close_approach_data[0].miss_distance.kilometers;
                const description = `Estimated diameter: ${randomNEO.estimated_diameter.kilometers.estimated_diameter_max} km`;
                const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCefv1D9gRKrNztny0NYYydr70rCnnCMD4E_Khvlb3F1-gUJWhkFftlWg&s';
                document.querySelector('.info-item.name').textContent = `Name: ${name}`;
                document.querySelector('.info-item.location').textContent = `Distance from Earth: ${distanceFromEarth} km`;
                document.querySelector('.info-item.description').textContent = description;
                document.querySelector('.image-placeholder').innerHTML = `<img src="${imageUrl}" alt="NEO Image" style="width:100%; height:auto;">`;
            } else {
                alert("No NEO data available.");
            }
        } catch (error) {
            console.error("Error fetching NEO data:", error);
            alert("Failed to load NEO data.");
        }
    }
    document.querySelector('.load-button').addEventListener('click', loadRandomNEO);
    loadRandomNEO();
});
