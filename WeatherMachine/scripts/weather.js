var WEATHER_KEY = "5ef392773bf2fe2574c203c5b9a85a50"; 
var MAP_KEY = 'AIzaSyBUprHALTDIBW9Lnj03jqh755lNrEyGpm0';

function change_unit(temp){
    switch($('#temp_unit').html()){
        case 'C':
            var fahr_temp = (parseFloat($('#temperature').html()) * 1.8) + 32;
            $('#temperature').html(fahr_temp);
            ($('#temp_unit').html('F'));
            break;
        case 'F':
            var cels_temp = (parseFloat($('#temperature').html()) - 32) / 1.8;
            $('#temperature').html(cels_temp);
            ($('#temp_unit').html('C'));
            break;
        default:
            break;
    }
}

function get_icon(weather){
    var weather_icons = new Array();
    weather_icons["rain"] = "<i class='wi wi-rain'></i>";
    weather_icons["sunny"] = "<i class='wi wi-day-sunny'></i>";
    weather_icons["snow"] = "<i class='wi wi-snow'></i>";
    weather_icons["meteor"] = "<i class='wi wi-meteor'></i>";
    
    switch(weather){
        case 'rain':
            return weather_icons['rain'];
        case 'sunny':
            return weather_icons['sunny'];
        case 'snow':
            return weather_icons['snow'];
        default:
            return weather_icons['meteor'];
    }
}

function show_weather(position){
    var API_root = "http://api.openweathermap.org/data/";
    var API_current_ver = "2.5/weather?"
    var API_options = '&type=accurate&units=metric&APPID=';
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var API_CALL = API_root.concat(API_current_ver) + 'lat=' + latitude.toFixed(2) + '&' + "lon=" + longitude.toFixed(2).concat(API_options);

    $.getJSON(API_CALL.concat(WEATHER_KEY), function(data){
        $("#weather").append(get_icon((data["weather"][0].main).toLowerCase()));
        var temperature = parseFloat(data["main"].temp);
        $("#temperature").append(temperature + '&deg;');
        $("#temp_unit").append('C');
    }).fail(function(jqxhr, textStatus, error){
        var err = textStatus + ',' + error;
        alert('Request Failed: ' + err);
    });
    
    var API_root = 'https://maps.googleapis.com/maps/api/geocode/json?';
    var params = 'latlng=' + latitude.toFixed(2) + ',' + longitude.toFixed(2) + '&key=' + MAP_KEY;
    $.getJSON(API_root.concat(params), function(data){
        var responseArray = (data['results'][0]['address_components']).filter(function(entry){
           return entry['types'].indexOf('neighborhood') > -1;
        });

        var responseObj = {};
        Object.keys(responseArray[0]).forEach(function(key){
           responseObj[key] = responseArray[0][key]; 
        });

        $("#location").append("<p>" + responseObj['long_name'] + "</p>");
        
        return temperature;
    }).fail(function(jqxhr, textStatus, error){
        var err = textStatus + ',' + error;
        alert('Request Failed: ' + err);
    });
}

$(document).ready(function(){
    var temp;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            temp = show_weather(position);
        }, null , {enableHighAccuracy: true, timeout: 100000, maximumAge: 0});
    }
    else{
        alert("Not supported");
    }
    
    $('#temp_unit').click(function(){
       change_unit(temp);
    });
    
});