
var topics = ['Captian America', 'Ironman', 'Spiderman', 'Thor', 'Hulk', 'Black Widow', 'Guardians of the Galaxy'] ;


renderButton();


function renderButton(){
    $("#topic-view").html('');
    for(var i = 0; i < topics.length; i++){
    var topicBtn = $("<button>");
    topicBtn.addClass("topic-button btn btn-success");
    topicBtn.attr(topics[i]);
    topicBtn.text(topics[i]);
    $("#topic-view").append(topicBtn);
    
    }; 
};

$(document).on("click", ".topic-button" , function(event){
    event.preventDefault();
    var btnValue = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    btnValue + "&api_key=ghyFYQnJw1q88Piu1UJPkfFq7PzllIAi&limit=10";
        
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response){
        var results = response.data;
        for(var i = 0; i < results.length;i++){
            if(results[i].rating !== 'r'){
                
                var imageState = "still";
                var imageUrl = results[i].images.original_still.url;
                var imageUrlStill  = results[i].images.original_still.url;
                var imageUrlAnimate = results[i].images.original.url;
                var heroImage = $("<img>");
                heroImage.attr("src", imageUrl);
                heroImage.attr("data-still",imageUrlStill )
                heroImage.attr("data-animate",imageUrlAnimate )
                heroImage.attr("state", imageState)
                heroImage.attr("alt", "Hero Image");
                heroImage.addClass("img-thumbnail");
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: "+ rating);
                gifDiv.append(heroImage);
                gifDiv.append(p);
                $("#gifImages").prepend(gifDiv);
            }
        }

      });
    });

    function updateState(state, element) {
        $(element).attr("src", $(element).attr("data-" + state));
        $(element).attr("state", state);
      }

      $(document).on("click",".img-thumbnail", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("state");
        //var dAnimate = $(this).attr("data-animate")
        
        
        if (state === "still") {
          updateState('animate', this);

        } else {
          updateState('still', this);
        }
      });

     
      $("#addHero").on("click", function(event){
        event.preventDefault();
        var newButton = $("#heroName").val();
        if (newButton === ''){
            //alert("Please enter a Super Hero Name");
            swal("Please enter the name of a Super Hero", "", "warning")
           
        }
         else{
            newButton.trim()
            topics.push(newButton);
            renderButton();
         } 

        });
        
      
    
    


