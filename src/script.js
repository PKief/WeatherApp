$(function () {
    $(".button-collapse").sideNav();

    $('.modal-trigger').leanModal();        
});

//Listeners
$(function () {
    $('#addLocationButton').on('click', function (e) {
        addLocation($('#city').val());
        $('#city').val('');
    });
});

function addLocation(city) {                
    var card = `
            <div class="col l4">
                <div class="card" id="`+ city + `">
                    <div class="card-image waves-effect waves-block waves-light">
                        <span class="temperature"></span>
                        <img class="activator locationImage" src="img/rainy.jpg">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">`+ city + `<i class="material-icons right">more_vert</i></span>
                        <p><a href="#"></a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">`+ city + `<i class="material-icons right">close</i></span>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>`;

    $('#allFavourites .row').append(card);
    
    //update weatherinformation
    getWeatherInformation(city);
}

function getWeatherInformation(city) {
    $.simpleWeather({
        location: city,
        woeid: '',
        unit: 'c',
        success: function (weather) {
            // html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
            // html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
            // html += '<li class="currently">' + weather.currently + '</li>';
            // html += '<li>' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</li></ul>';

            // $("#weather").html(html);
            
            $('#'+city+' span.temperature').html(weather.temp + '° '+weather.units.temp);                                                
        },
        error: function (error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });    
}
