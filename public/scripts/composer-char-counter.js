$( document ).ready(function() {

    var max_text_length = 140;
    var text_length = 0;
    var text_left = max_text_length - text_length;

    $( ".new-tweet form textarea" ).on( "keyup", function(ev) {
      text_length = $(this).val().length;
      text_left = max_text_length - text_length;
      var counter = $(this).siblings('.counter');
      counter.text(text_left);

      if (text_left < 0) {
        counter.css("color", "red");
      }
    });
});
