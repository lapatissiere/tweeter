$(document).ready(function () {
  console.log("Here I am!");

  //registering an event handler to the textarea element

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
});
