$(document).ready(function () {
  // Registering an event handler to the textarea element
  $(".new-tweet textarea").on("input", function () {
    const maxLength = 140; // Maximum character count allowed
    const currentLength = $(this).val().length; // Get the current length of the textarea's value
    const remainingLength = maxLength - currentLength; // Calculate the remaining characters

    const counterElement = $(".new-tweet .counter");
    counterElement.text(remainingLength);

    if (remainingLength < 0) {
      counterElement.addClass("red");
    } else {
      counterElement.removeClass("red");
    }
  });

  // Reset the counter when the textarea is cleared or its value is set programmatically
  $(".new-tweet textarea").on("change", function () {
    const counterElement = $(".new-tweet .counter");
    const maxLength = 140;
    const currentLength = $(this).val().length;

    if (currentLength === 0) {
      counterElement.text(maxLength);
      counterElement.removeClass("red");
    }
  });

  // Reset the counter after submitting the tweet
  $(".new-tweet form").on("submit", function () {
    const counterElement = $(".new-tweet .counter");
    const maxLength = 140;
    
    counterElement.text(maxLength);
    counterElement.removeClass("red");
  });
});