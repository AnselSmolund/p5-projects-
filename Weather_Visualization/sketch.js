var weather;
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var input;
var temp;
var humBox;
var tempBox;
var mplsBox;
var windBox;
var apiKey = '&appid=6e68ea4e907b436ecd6c9133a34a9f9f&units=metric';
var mapImg
var x, y;
var windAnimation = [];
var clat = 0;
var clon = 0;
var zoom =1;
var cx,cy;
var direction;
var deg;
function preload() {
    mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/light-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic21vbHUwMDYiLCJhIjoiY2l6ZWM2ZThjMnF4ZTMycWk1eDFnMXc1YiJ9.fV0Ta94NyiM-Gwt0AU2zQg');
}
function mercX(lon){
  lon = radians(lon);
  var a = (256 / PI)*pow(2,zoom);
  var b = lon + PI;
  return a * b;
}
function mercY(lat){
  lat = radians(lat);
  var a = (256 / PI)*pow(2,zoom);
  var b = tan(PI / 4 + lat /2);
  var c = PI - log(b);
  return a*c;
}
function setup() {
    createCanvas(1024, 512);
    translate(width/2,height/2);
    cx = mercX(clon);
    cy = mercY(clat);
    var button = select('#Submit');
    button.mousePressed(weatherAsk);
    input = select('#city');
    tempBox = document.getElementById('cel');
    windBox = document.getElementById('wind');
    humBox = document.getElementById('humid');

}

function weatherAsk() {
    var url = api + input.value() + apiKey;
    loadJSON(url, gotData);
}

function gotData(data) {
    weather = data;
    deg = weather.wind.deg;
    console.log(deg);
    if(deg > 213 && deg < 303){
      direction = 'W';
    }
    if(deg > 303 || deg < 33){
      direction = 'N';
    }
    if(deg > 33 && deg < 124){
      direction = 'E'
    }
    if(deg >= 124 && deg <= 213){
      direction = 'S';
    }
    for(var i = 0; i < 100; i++){
        windAnimation.pop();
      }
    for(var i = 0; i < 100; i++){
        windAnimation.push(new wind(direction,weather.wind.speed));
      }


}

function draw() {
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapImg,0,0);
    if (weather) {
        temp = Math.round(weather.main.temp * (9 / 5) + 32);
        var lat = weather.coord.lat;
        var lon = weather.coord.lon;
        x = mercX(lon) - cx;
        y = mercY(lat) - cy;
        if (tempBox.checked) {
            fill(0, 101, 153, 60);
            ellipse(x, y, temp * temp/20, temp * temp/20);
            textSize(28);
            fill(0, 101, 153);
            text(temp + " F", -492, 224);
        }
        if (windBox.checked) {
          for(var i = windAnimation.length -1; i >= 0; i--){
            windAnimation[i].update();
            windAnimation[i].show();
          }
            textSize(28);
            fill(0, 120, 32);
            text(Math.round(weather.wind.speed*.62) + " m/h", -432, 224);
        }
        if (humBox.checked) {
            fill(250, 0, 0, 40);
            ellipse(x, y, weather.main.humidity*weather.main.humidity/10, weather.main.humidity*weather.main.humidity/10);
            textSize(28);
            fill(200,20,0);
            text(weather.main.humidity + "%",-357,224);
        }
        fill(255);
        ellipse(x,y,5,5);

    }

}
