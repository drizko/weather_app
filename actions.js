(function(){
  'use strict';

  fetch("http://weathersync.herokuapp.com/ip", {
    method: 'GET'
  })
  .then(function(response){
    return response.json();
  })
  .then(function(coords){
    return fetch("http://weathersync.herokuapp.com/weather/" + coords.location.latitude + "," + coords.location.longitude, {
      method: 'GET'
    })
  })
  .then(function(response){
    return response.json();
  })
  .then(function(weather){
    console.log(weather);

    var city = document.getElementsByClassName('city');
    var temp = document.getElementsByClassName('temp');
    var logo = document.getElementsByClassName('image');
    var desc = document.getElementsByClassName('description');

    // T(°F) = T(K) × 9/5 - 459.67
    var convertedTemperature = Math.round(weather.main.temp * 9 / 5 - 459.67)

    city[0].innerText = weather.name;
    temp[0].innerText = convertedTemperature;
    desc[0].innerText = weather.weather[0].main;
    logo[0].src = 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png';

  })
  .catch(function(error){
    console.log(error);
  })
})()
