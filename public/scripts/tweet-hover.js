$( document ).ready(function() {
  $('#display-tweets article').hover(function(){
    $(this).find('.fa').toggle();
  });
});
