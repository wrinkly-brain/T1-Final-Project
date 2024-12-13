# T1-Final-Project
The homepage displays small descriptions of each of the other three pages on the website. This page’s function is just to welcome the user and give them a small description of each page. There are no forms or API functions on this page.

The Astronomy Picture of the Day (APOD) page (Nailah’s page) displays the information of a random APOD along with the picture itself. The user can click a button to generate another random APOD. The page makes an initial API call to fetch the current APOD. Then, if the user clicks on the button that generates a random APOD, the page makes another API call to fetch a random APOD using the “count” query parameter. 

The Near-Earth Objects (NEOs) page (Austin’s page) displays the information of a random NEO. The user can click a button to receive the information of another random NEO. Upon loading into the page, the website fetches all of the NEO data from the NASA API, then displays a random NEO.

The Curiosity Rover page (Jonas’s page) allows the user to generate and look through an album of images based on the solar day the user wants and the camera angle the user wants. Upon loading into the page, an API fetch request is made to check a value. That value is used to check user input. API fetch requests (which change based on user input) are made when the user clicks the apply changes button.
