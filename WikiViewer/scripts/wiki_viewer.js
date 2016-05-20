$(document).ready(function(){
    var params = {
        titles: 'Main Page',
        prop: 'revisions',
        rvprop: 'content',
        format: 'jsonfm'
    };
    
    var base_url = 'https://en.wikipedia.org/w/api.php';
    
   $.ajax({
      url: base_url,
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {
          action: 'query',
          //list: 'search',
          //srsearch: 'meaning',
          //srprop: 'sectionsnippet',//|titlesnippet|categorysnippet',
          //srlimit: '5',
          //srwhat: 'text',
          /*
          titles: 'meaning',
          prop: 'extracts',
          exintro: 'true',
          exlimit: '10',
          format: 'json',
          formatversion: '2'
          */
          generator: 'allpages',
          gaplimit: '2',
          gapfrom: 'meaning',
          prop: 'links|categories',
          format: 'json',
          formatversion: '2'
          //rvprop: 'content',
      },
      type: 'GET',
      headers: { 'Api-User-Agent': 'Example/1.0' },
      success: function(data){
          alert(JSON.stringify(data));
          $('body').append(JSON.stringify(data.query.pages[0].extract));
          //alert(JSON.stringify(data.query.pages[0].extract));
          //data.query.search.forEach(function(element){
              /*
          data.query.pages.forEach(function(element){
              var $newdiv = $('<div>');
              $newdiv.html(element['snippet']);
              $('body').append($newdiv);
              $('body').append('<br/>');
          });
          */
          //data.query.pages.;
      } 
   });
});