$(document).ready(function(){
  $("#quote-button").click(function(){
    $.ajax({
            url: "http://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            crossDomain: true,
            data: { method: "getQuote", format:"jsonp", lang:"en" },
            dataType: "jsonp",
            success: function (response) {
              var formatted_response = format_string(response["quoteText"]);
              var formatted_author = format_author(response["quoteAuthor"]);
              var random_quote = "\"" + formatted_response + "\"";
              var tweet_href = "https://twitter.com/intent/tweet?text=\"" + formatted_response + "\"";
              $("#quote-text").fadeOut(300, function(){
                $("#quote").text(random_quote);
                $("#quote-author").text(formatted_author);
                $(this).fadeIn(500);
              });
              $("#twitter-share-button").attr("href", tweet_href);
            },
            error: function (xhr, status) {
                alert("error");
            }
        });
  });
});

function format_author(str){
  if(!str){
    return "Anonymous";
  }
  return str;
}

function format_string(str){
  if(str.charAt(str.length-1) == ' '){
    return str.trim();
  }
  return str;
}
