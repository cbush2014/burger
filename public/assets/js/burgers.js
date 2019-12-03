$(function() {
  $(".btnDevour").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var id = $(this).data("id");
  
      // Send the POST request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: 'scooby'
      }).then(
        function() {
          console.log("updated devoured");
          // Reload the page to get the updated list
          location.assign("/");
        }
      );
    });
  });
