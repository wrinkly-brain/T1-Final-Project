
$(document).ready(function (){
    fetchNasa()
});

$(document).ready(function(){
    randButton()
});

function randButton(){
    
}

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
           $('#title').text(title)
           $("#date").text(date)
           $("#explanation").text(explanation)
           $("#pic").attr("src", url)
        }

    })
}

