// initial array of actors
var actorArray = ["Adam Sandler", "Will Ferrell", "Steve Carell", "Jim Carrey", "Kristen Wiig", "Tina Fey"];

// displayActorInfo function re-renders HTML to display appropriate content
function displayActorInfo() {

    var actor = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actor + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        var results = response.data;


        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-state", "still")
            personImage.addClass("gif");


            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
        }

    });
};


// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $(".actorBtns").empty();

    // Looping through the array of movies
    for (var i = 0; i < actorArray.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("actor-btn btn btn-primary");
        // Adding a data-attribute
        a.attr("data-person", actorArray[i]);
        // Providing the initial button text
        a.text(actorArray[i]);
        // Adding the button to the buttons-view div
        $(".actorBtns").append(a);


    }
}

// This function handles events where a movie button is clicked
$("#add-actor").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var actor = $("#actor-input").val().trim();

    // Adding movie from the textbox to our array
    actorArray.push(actor);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".actor-btn", displayActorInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();


// ==========================================================================

$("body").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

})


