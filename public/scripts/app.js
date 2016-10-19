'use strict';
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $( document ).ready(function() {

    // function to escape some text to prevent Cross-Site Scripting
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    function createTweetElement(tweet) {
      var $tweet = $('<article>').addClass('tweet');
      $tweet.append('<header>' +
                            '<img src=' + tweet.user.avatars.regular + '>' +
                            '<span class="full-name">' + tweet.user.name + '</span>' +
                            '<span class="user-name">' + tweet.user.handle + '</span>' +
                    '</header>' +
                    '<section>' +
                            '<p>' + escape(tweet.content.text) + '</p>' +
                    '</section>' +
                    '<footer>' +
                            '<span>' + Math.floor((new Date() - new Date(tweet.created_at)) / 86400000) + ' days ago' + '</span>' +
                            '<i class="fa fa-heart" aria-hidden="true"></i>' +
                            '<i class="fa fa-retweet" aria-hidden="true"></i>' +
                            '<i class="fa fa-flag" aria-hidden="true"></i>' +
                    '</footer>');

      return $tweet;

    }

    function renderTweets(tweets) {
      // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
      var $tweet = $('<div></div>');
      for (var i = tweets.length - 1; i >= 0; i--) {
        console.log(i);
        $tweet.append(createTweetElement(tweets[i]));
      }
      return $tweet;
    }

    function loadTweets(){
      $.ajax({
        url: '/tweets/',
        method: 'GET',
        success: (response) => {
          $('#display-tweets').html(renderTweets(response));
        }
      });
    }

    $('#new_tweet_form').on('submit', function(ev){
      ev.preventDefault();

      const request_data = $(this).serialize();
      const tweet_length = request_data.length - 5;

      if (tweet_length === 0) {
        alert('Tweet cannot be empty!');
      } else if (tweet_length > 140) {
        alert('Tweet cannot be longer than 140 characters!');
      } else {
        $.ajax({
          url: '/tweets/',
          method: 'POST',
          data: request_data,
          success: (response) => {
            console.log('Successfully sent post request', request_data, response);
          }
        });
        loadTweets();
        // Clear text
        $('.new-tweet > form > textarea').val("");
        // Reset counter
        $('.new-tweet > form > .counter').text('140');
      }

    })

    loadTweets();

    $(".new-tweet").hide();

    $('#compose-button').on('click', function (){
      $(".new-tweet").slideToggle(200);
      $(".new-tweet > form > textarea").focus();
    });

    // $('#display-tweets').mouseenter('article', function(){
    //   $(this).find('.fa').toggle();
    // });
 });
