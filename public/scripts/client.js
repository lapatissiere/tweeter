/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//This function can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet in tweets) {
    // calls createTweetElement for each tweet
    const tweetdata = createTweetElement(tweets[tweet]);
    // takes return value and appends it to the tweets container
    $('#containertweet').prepend(tweetdata);
  }
};

//Code for the escape feature to protect the page from inputs that can change the page
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let $tweet =
  `<article class = "bordertweet">
    <header class = "headertweet">
      <img class = "headeruserphoto" src= ${tweet.user.avatars}></img>
      <span class="headername">${tweet.user.name}</span>
      <span class="headerusername">${tweet.user.handle}</span>
    </header>
    <p class="tweetsentence">${escape(tweet.content.text)}</p>
    <span class = "tweetline"></span>
    <footer class = "footertweet">
      <a> ${timeago.format(tweet.created_at)} </a>
      <div class = "tweetbuttons">
        <button class = "btn"><i class="fa-solid fa-flag"></i></button>
        <button class = "btn"><i class="fa-solid fa-retweet"></i></button>
        <button class = "btn"><i class="fa-solid fa-heart"></i></button>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

// a function called loadTweets that is responsible for fetching tweets from the http://localhost:8080/tweets page using Ajax
function loadTweets() {
  $.ajax('/tweets', {method: 'GET'})
    .then(function(data) {
      renderTweets(data);
    });
}

$(document).ready(function() {
//on clicking tweet button
  $(".tweetsubmit").submit(function(event) {
    event.preventDefault();
//checking length of tweet; giving commands depending on length
    if ($("#tweet-text").val().length > 140) {
      $(".errormessage").html(`<i class="fa-solid fa-triangle-exclamation"></i> &nbsp Error: Your tweet is over 140 characters! &nbsp <i class="fa-solid fa-triangle-exclamation"></i>`).slideDown().delay(3000).slideUp(500);
    } else if ($("#tweet-text").val().length === 0) {
      $(".errormessage").html(`<i class="fa-solid fa-triangle-exclamation"></i> &nbsp Error: A blank tweet cannot be posted! &nbsp <i class="fa-solid fa-triangle-exclamation"></i>`).slideDown().delay(3000).slideUp(500);
// return;
    } else {
      $(".errormessage").html(``);
// Add an event listener that listens for the Submit event
// Serialize form data, send it to server as query string
      $.post('/tweets', $(this).serialize()).then(function() {
        $("#tweet-text").val(null);
// Calling ajax to get last submission
        $.ajax('/tweets', {method: 'GET'}).then(function(data) {
// Getting last tweet
          const tweetdata = createTweetElement(data[data.length - 1]);
          $('#containertweet').prepend(tweetdata);
        });
      });
    }
  });
});
// Loading all tweets at front of page
loadTweets();