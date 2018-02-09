$(document).ready(function() {
  $("#writeTweet").keyup(function() {
    let value = $(this).val().length;
    let charLimit = 140 - value;
    let charCounter = $(this).closest("form").children(".counter");
    charCounter.html(charLimit);
    if (charLimit < 0) {
      charCounter.css({
        "font-style": "oblique",
        "color": "red"
      });
    } else {
      charCounter.css({
        "font-style": "normal",
        "color": "#244751"
      });
    }
  });
});
