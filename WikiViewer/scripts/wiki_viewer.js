$('#input-form').on('submit', false);

function myfunction(){
    $(document).ready(function(){
        
        var params = {
            titles: 'Main Page',
            prop: 'revisions',
            rvprop: 'content',
            format: 'jsonfm'
        };
        
        var base_url = 'https://en.wikipedia.org/w/api.php';
        
        var search_text = $('#user-input').val();
    
        if(search_text){
            $.ajax({
                url: base_url,
                jsonp: 'callback',
                dataType: 'jsonp',
                data: {
                    action: 'query',
                    prop: 'extracts|info',
                    generator: 'search',
                    exsentences: '1',
                    exlimit: '20',
                    exintro: '1',
                    explaintext: '1',
                    inprop: 'url',
                    gsrsearch: search_text,
                    gsrnamespace: '0',
                    format: 'json',
                    formatversion: '2'
                },
                type: 'GET',
                headers: { 'Api-User-Agent': 'Example/1.0' },
                success: function(data){
                    $('#search-results').empty();
                    data.query.pages.forEach(function(element){
                        var $contentdiv = $('<div>');
                        $contentdiv.addClass('infodiv');
                        var $title = $('<h3>');
                        $title.html(element['title']);
                        $contentdiv.append($title);
                        $contentdiv.append(element['extract']);
                        var $pagelink = $('<a>');
                        $pagelink.attr('href', element.fullurl);
                        $contentdiv.append($pagelink);
                        $('#search-results').append($contentdiv);
                    });
                },
                error: function(){
                    alert('Error making AJAX call');
                }
          });
        }
   });
}