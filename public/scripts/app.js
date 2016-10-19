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

   // Fake data taken from tweets.json
    var data = [
      {
        "user": {
          "name": "Newton",
          "avatars": {
            "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
          },
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": {
            "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
            "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
            "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
          },
          "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      },
      {
        "user": {
          "name": "Johann von Goethe",
          "avatars": {
            "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
            "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
            "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
          },
          "handle": "@johann49"
        },
        "content": {
          "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
      }
    ];

    function renderTweets(tweets) {
      // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
      var $tweet = $('<div></div>');
      for (var i in tweets) {
        $tweet.append(createTweetElement(tweets[i]));
      }
      return $tweet;
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

    //console.log($tweet); // to see what it looks like
    //$('#display-tweets').append('hi'); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    //$('#display-tweets').append(createTweetElement(data));
    $('#display-tweets').append(renderTweets(data));

 });
