$(function () {
    $(".button-collapse").sideNav();

    $('.modal-trigger').leanModal();


    //for each city in local storage add a card
    var storedLocations = JSON.parse(localStorage.getItem("locations"));
    if (storedLocations) {
        storedLocations.forEach(function (location) {
            addLocation(location);
        }, this);
    }

});

//Listeners
$(function () {
    $('#addLocationButton').on('click', function (e) {
        addLocation($('#city').val());
        $('#city').val('');
    });
});

$(function () {
    $('.dropCard').on('click', function () {
        alert('test');
    });
});

function addLocation(city) {
    var card = `
            <div class="col l4">
                <div class="card" id="`+ city + `">
                    <a class="dropCard" href="#"><i class="material-icons">close</i></a>
                    <div class="card-image waves-effect waves-block waves-light">
                        <span class="temperature"></span>
                        <img class="activator locationImage" src="img/cloudy.jpg">
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
    
    if (locationExistsInStorage(city) === false) {
        var storedLocations = JSON.parse(localStorage.getItem("locations"));
        if(!storedLocations){            
            storedLocations = [];
        }
        storedLocations.push(city);
        localStorage.setItem("locations", JSON.stringify(storedLocations));
    }    

    //update weatherinformation
    getWeatherInformation(city);
}

function locationExistsInStorage(city) {
    var storedLocations = JSON.parse(localStorage.getItem("locations"));
    //checks if location is already saved in local storage
    if(storedLocations){    
        var foundOne = false;    
        storedLocations.forEach(function (location) {
            if (location.toLowerCase().indexOf(city.toLowerCase()) != -1) {
                foundOne = true;                
                return true;                
            }
        });
        return foundOne;
    }else{
        return false;
    }
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

            $('#' + city + ' span.temperature').html(weather.temp + '° ' + weather.units.temp);

            //get the current weather state
            if (weather.currently.toString().toLowerCase().indexOf('cloudy') != -1) {
                $('#' + city + ' img.locationImage').attr('src', 'img/cloudy.jpg');
            } else if (weather.currently.toString().toLowerCase().indexOf('sunny') != -1) {
                $('#' + city + ' img.locationImage').attr('src', 'img/sunny.jpg');
            } else if (weather.currently.toString().toLowerCase().indexOf('rainy') != -1) {
                $('#' + city + ' img.locationImage').attr('src', 'img/rainy.jpg');
            } else if (weather.currently.toString().toLowerCase().indexOf('storm') != -1) {
                $('#' + city + ' img.locationImage').attr('src', 'img/storm.jpg');
            } else {
                $('#' + city + ' img.locationImage').attr('src', 'img/sunny.jpg');
            }
        },
        error: function (error) {
            alert(error);
            $('#' + city).remove();
        }
    });
}
