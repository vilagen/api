

topic = ['how i met your mother', 'brooklyn nine-nine', 'scrubs', 'simpsons', 'its always sunny in philadelphia', 'family guy', 'community', 'parks and recreation', '30 rock']

topicOMDB = ['lion king']

sitcomGiphy = undefined

// make the buttons appear on page
function makeButtons() {
    for(var i = 0; i < topic.length; i++){
        sitcomButtons = document.createElement("button")
        sitcomButtons.setAttribute('class', 'btn-success giphybuttons mx-3 my-2')
        sitcomButtons.setAttribute('data-show', topic[i])
        sitcomButtons.innerHTML = topic[i]
        document.getElementById('buttons').appendChild(sitcomButtons)
        }
}

// make seperate buttons for movies
function makeOMDBButtons() {
    for(var i = 0; i < topicOMDB.length; i++){
        sitcomButtons = document.createElement("button")
        sitcomButtons.setAttribute('class', 'purple ombdbuttons mx-3 my-2')
        sitcomButtons.setAttribute('data-movie', topicOMDB[i])
        sitcomButtons.innerHTML = topicOMDB[i]
        document.getElementById('buttons').appendChild(sitcomButtons)
        }
}


// have default topic list appear on page load
document.addEventListener('DOMContentLoaded', function() {
    makeButtons()
    makeOMDBButtons()
})

// on click command to add input to topic array, then re-create list of buttons
// using some vanilla javascript as practice to get it used to it more.
document.getElementById('submitShow').addEventListener("click", addtoTopic)
function addtoTopic(event){
    input = document.getElementById('inputShow').value
    let buttons = document.getElementById('buttons');

    if(input === '') {}
    else if(topic.includes(input.toLowerCase())) {}
    else{
    topic.push(input.toLowerCase())
    document.getElementById('inputShow').value=''
    while(buttons.firstChild){
    buttons.removeChild(buttons.firstChild)
    }
    makeButtons()
    makeOMDBButtons()
    }
}

document.getElementById('submitOMDB').addEventListener("click", addtoTopicOMDB)
function addtoTopicOMDB(event){
    input = document.getElementById('inputMovie').value
    let buttons = document.getElementById('buttons');

    if(input === ''){}
    else if(topicOMDB.includes(input.toLowerCase())) {}
    else{
    topicOMDB.push(input.toLowerCase())
    document.getElementById('inputMovie').value=''
    while(buttons.firstChild){
    buttons.removeChild(buttons.firstChild)
    }
    makeButtons()
    makeOMDBButtons()
    }
}

// make gifs appear when click on button
$(document).on('click', 'button.giphybuttons', function(){
    let show = $(this).attr('data-show').replace(/ /g,'+')
    console.log(show)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show +
                        "&api_key=Mt5OLmzT8noaT1N3lI4m3JUJ5cS4vAxK&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        let results = response.data
        

        for (var i = 0; i < results.length; i++){
        let showDiv = $('<div class = "float-left mr-2 mt-3">')
        let rating = $('<p>').text("Rating: " + results[i].rating)
        let showImages = $('<img>')
        let still = results[i].images.fixed_height_still.url
        let animate = results[i].images.fixed_height.url
        
        showImages.addClass('gif')
        showImages.attr('src', still).attr('data-state', 'still')
        showImages.attr('data-still', still).attr('data-animate', animate)
        $(showDiv).append(rating, showImages)
        $('#show-gifs').prepend(showDiv)
        }
    })
})

$(document).on('click', 'button.ombdbuttons', function(){
    let movie = $(this).attr('data-movie').replace(/ /g,'+')
    console.log(movie)

    var queryURL = "https://www.omdbapi.com/?t=" + movie +
                        "&apikey=5074847d"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response.Title)
        console.log(response.Rated)
        let showDiv = $('<div class = "fullwidth float-left bg-dark text-light mr-2 mt-3">')
        let title = $('<p class = "mx-2">').text("Title: " + response.Title)
        let rating = $('<p class = "mx-2">').text("Rated: "+ response.Rated)
        let plot = $('<p class = "mx-2">').text("Plot: " + response.Plot)
        let actors = $('<p class = "mx-2">').text("Starring: " + response.Actors)
        let metascore = $('<p class = "mx-2">').text("Metascore: " + response.Metascore)
        $(showDiv).append(title, rating, plot, actors, metascore)
        $('#show-gifs').prepend(showDiv)
    })
})

// to pause and play gifs
// if in a state of still, will change source to animated gif
// and if in any other state but 'still', will change source to still image
$('#show-gifs').on('click', 'img.gif', function(){
    var run = $(this).attr('data-state')
    if(run === 'still'){
        $(this).attr('src', $(this).attr('data-animate'))
        $(this).attr('data-state', 'animate')
    }
    else{
        $(this).attr('src', $(this).attr('data-still'))
        $(this).attr('data-state', 'still')
    }
})
