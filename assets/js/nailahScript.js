
$(document).ready(function (){
    fetchCurrent()
});
document.getElementById("randButton").onclick = () => {
    fetchNasa();
}

function fetchCurrent(){

    $.ajax({
        url: "https://api.nasa.gov/planetary/apod?api_key=xAP1HKs1wN8evwCa3vQjye47l8WBGVtcM5UFtTT8",
        type: "GET",
        dataType: "json",
        success: function(data) {
           let date = data.date;
           let explanation = data.explanation;
           let title = data.title;
           let url = data.url;
           $('#title').text(title)
           $("#date").text(date)
           $("#explanation").text(explanation)
           $("#pic").attr("src", url)
        }

    })
}

function fetchNasa(){

    $.ajax({
        url: "https://api.nasa.gov/planetary/apod?api_key=xAP1HKs1wN8evwCa3vQjye47l8WBGVtcM5UFtTT8&count=1",
        type: "GET",
        dataType: "json",
        success: function(data) {
           let date = data[0].date;
           let explanation = data[0].explanation;
           let title = data[0].title;
           let url = data[0].url;
           $('#title').text(title)
           $("#date").text(date)
           $("#explanation").text(explanation)
           $("#pic").attr("src", url)
        }

    })
}