

// initial array of actors
var actorArray = ["Adam Sandler", "Will Ferrell", "Steve Carell", "Jim Carrey", "Kristen Wiig", "Tina Fey"];

// Convert actor array into array of buttons


actorArray.forEach(function (element) {
    button = $("<button>");
    button.append(element);
    button.attr("data-person", element);
    button.addClass("actorBtnClass");
    $(".actorBtns").append(button);

})

// on click button function


$(".actorBtnClass").on("click", function (event) {
    console.log("onclickBtn");
    event.preventDefault();

    var text = $(this).text();



    var actor = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actor + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log("ajax working");

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
})


// ===================================================================














// ==========================================================================


$(".gif").on("click", function () {
    // STEP ONE: study the html above.
    // Look at all the data attributes.
    // Run the file in the browser. Look at the images.

    // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

    // STEP TWO: make a variable named state and then store the image's data-state into it.
    // Use the .attr() method for this.

    // ============== FILL IN CODE HERE FOR STEP TWO =========================

    // CODE GOES HERE

    var state = $(this).attr("data-state");


    // =============================================

    // STEP THREE: Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.

    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
    // ============== FILL IN CODE HERE FOR STEP THREE =========================

    // CODE GOES HERE
    var stillImageSrc = $(this).attr("data-still");
    var animateImageSrc = $(this).attr("data-animate");

    // ==============================================
    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", animateImageSrc)
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", stillImageSrc);
    }

    // STEP FOUR: open the file in the browser and click on the images.
    // Then click again to pause.


});