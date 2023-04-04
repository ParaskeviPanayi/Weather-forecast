function onClick() {
    reload = location.reload();
    console.log('clicked');
    }

const forbiden_button = document.querySelector('#forbiden_button');
forbiden_button.addEventListener('click', onClick);


//const warning_button=document.querySelector('#warning_button');
//warning_button.addEventListener('click', onClick);


const adress_input = document.querySelector('#adress_input');

adress_input.addEventListener('change', function() {
    
        console.log(adress_input.value);
        
       
    })

const region_input = document.querySelector('#region_input');

region_input.addEventListener('change', function() {
console.log(region_input.value);
})


const selectElem = document.querySelector('#city_selector');
selectElem.addEventListener('change', function() {
const index = selectElem.selectedIndex;
console.log('index selected: ' + index);
console.log('option value selected: ' + 
selectElem.options[index].value);
})

const checkbox_c = document.querySelector('#Celcious_id');
checkbox_c.addEventListener('change', function() {
console.log(checkbox_c.checked);
console.log(checkbox_c.value);
})

const checkbox_f= document.querySelector('#Fahrenheit_id');
checkbox_f.addEventListener('change', function() {
console.log(checkbox_f.checked);
console.log(checkbox_f.value);
})


//const search_button = document.querySelector('#search_button');
//search_button.addEventListener('click',loginResults);

function validate(){

let  adress=document.getElementById("adress_input").value; 
let region=document.getElementById("region_input").value;
let city=document.getElementById("city_selector").value;;


if(adress===""){
  error.textContent = "Please enter your address!"
  error.style.color = "red"
}

if(region===""){
  error2.textContent = "Please enter your region!"
  error2.style.color = "red"
}




}

document.getElementById("theForm").onsubmit = function(e) {

    validate();
    e.preventDefault();
    // AJAX here
    
   //loginResults();
   var xhr = new XMLHttpRequest();

   xhr.onreadystatechange = function () {

   if (xhr.readyState !== 4){
   return;
   }
   
   if (xhr.status >= 200 && xhr.status < 300) {
    // What to do when the request is successful
    console.log(JSON.parse(xhr.responseText));

    var resp=JSON.parse(xhr.responseText)

    var lat=resp[0].lat;
    var long=resp[0].lon;

    console.log(resp[0].lon);
    console.log(resp[0].lat);

    //Right now tab
    CurrentWeather(lat,long);

    //Next 24 hours
    ForecastWeather(lat,long);

    Post_Data_PHP();

    } else {
    // What to do when the request has failed
    console.log('error', xhr);
    }

   }

   var adress=document.getElementById("adress_input").value;
   var region=document.getElementById("region_input").value;
   var city=document.getElementById("city_selector").value;  
   
   var a="q="+adress+","+region+","+city+"&format=json";

   xhr.open("GET","https://nominatim.openstreetmap.org/search?"+a);

   xhr.send(a);

   console.log("form submission intercepted");
 
};

function Post_Data_PHP (){

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
if (xhr.readyState !== 4) return;
if (xhr.status >= 200 && xhr.status < 300) {
console.log(xhr.responseText);
} else {
console.log('error', xhr);
}
}


 xhr.open("POST", "action.php");
 xhr.setRequestHeader("Content-Type", "application/json");

  const data = {};
 data.username="ppanag03"; 
 data.address=document.getElementById("adress_input").value;
 data.region=document.getElementById("region_input").value;
 data.city=document.getElementById("city_selector").value;

  xhr.send(JSON.stringify(data));

}


function GET_Data_PHP(){
  console.log("GET");
  var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
if (xhr.readyState !== 4) return;
if (xhr.status >= 200 && xhr.status < 300) {
console.log(xhr.responseText);

var resp=JSON.parse(xhr.responseText)

var time = [];
var adress = [];
var region = [];
var city=[];

for(let i=0;i<5;i++){
time[i]=resp.array[i].timestamp;
adress[i]=resp.array[i].address;
region[i]=resp.array[i].region;
city[i]=resp.array[i].city;
}

for(let i=0;i<5;i++){
  
  date=new Date(time[i]*1000);
  
  var var_time=document.getElementsByClassName("m_Time")[i];
  var_time.innerHTML=date.getHours()+":"+date.getMinutes();

  var var_address=document.getElementsByClassName("m_Adress")[i];
  var_address.innerHTML=adress[i];

  var var_region=document.getElementsByClassName("m_Region")[i];
  var_region.innerHTML=region[i];

  var var_city=document.getElementsByClassName("m_City")[i];
  var_city.innerHTML=city[i];

}


} else {
console.log('error', xhr);
}
}

 const data={};
 data.username="ppanag03"; 
 xhr.open("GET", "action.php");
 xhr.setRequestHeader("Content-Type", "application/json");
 xhr.send(JSON.stringify(data));
}

const server_clicked=document.querySelector('#server_button');
server_clicked.addEventListener('click',GET_Data_PHP );


function CurrentWeather(lat,long){


    var key="d9b43feda451d7c9e7c0fdd012120862";

    
    console.log('Your latitude is :'+lat+' and longitude is '+long);
    
    var units;

    var xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function () {

        
        if (xhr.readyState !== 4){
        return;
        }
        
        if (xhr.status >= 200 && xhr.status < 300) {
         // What to do when the request is successful
         console.log(JSON.parse(xhr.responseText));
     
         var resp=JSON.parse(xhr.responseText)

         //image display

         var forecast_metric = document.getElementById("#Celcious_id");

         var icon = resp.weather[0].icon;
     
         console.log( resp.weather[0].icon);
         
         var var1=document.getElementById("image_id");

         var1.innerHTML = "<img src='http://openweathermap.org/img/wn/" +icon+ "@2x.png' >";

         //table display 

         var description=resp.weather[0].description;
         var temp=resp.main.temp;
         var temp_min=resp.main.temp_min;
         var temp_max=resp.main.temp_max;

         var pressure=resp.main.pressure;
         var humidity=resp.main.humidity;
         var wind_speed=resp.wind.speed;
         //console.log(resp.wind.speed);
         var cloud_cover=resp.clouds.all;
         //console.log(resp.clouds.all);
         var sunrise=resp.sys.sunrise;
         var sunset=resp.sys.sunset;

         var var_description=document.getElementById("weather_dec");
         var_description.innerHTML=description;

         var forecast_metric=document.getElementById("Celcious_id").checked;
         var forecast_unit1=document.getElementById("Fahrenheit_id").checked;
         
         

         if(forecast_metric===true){
            var temp_metric="&ordmC";
            var press_metric="hPa";
            var wind_metric="meters / sec";
         }

         if(forecast_unit1===true){
            var temp_metric="&ordmF";
            var press_metric="Mb";
            var wind_metric="miles / hour";
         }



         var var_temp=document.getElementById("temp");
         var_temp.innerHTML=temp+" "+temp_metric;
         
         var var_temp=document.getElementById("temp_min");
         var_temp.innerHTML="L:"+temp_min+" "+temp_metric+" |";

         var var_temp=document.getElementById("temp_max");
         var_temp.innerHTML="H:"+temp_max+" "+temp_metric;

         var var_pressure=document.getElementById("pressure_id");

         var_pressure.innerHTML=pressure+" "+press_metric;

         var var_humidity=document.getElementById("humidity_id");

         var_humidity.innerHTML=humidity+" %";
     
         var var_wind_speed=document.getElementById("wind_speed_id");

         var_wind_speed.innerHTML=wind_speed+" "+wind_metric;

         var var_cloud=document.getElementById("cloud_id");

         var_cloud.innerHTML=cloud_cover+" %";

         date1 = new Date(sunrise*1000);
         date2= new Date(sunset*1000);

         var var_sunrise=document.getElementById("sunrise_id");

         var_sunrise.innerHTML=date1.getHours()+":"+date1.getMinutes();

         var var_sunset=document.getElementById("sunset_id");

         var_sunset.innerHTML=date2.getHours()+":"+date2.getMinutes();



         var map = document.getElementById("map");
         map.innerHTML="";
         map = new ol.Map({
           target: 'map', 
           layers: [ 
           new ol.layer.Tile({ 
           source: new ol.source.OSM()
           })
           ],
           view: new ol.View({ 
           center: ol.proj.fromLonLat([long, lat]),
           zoom: 15 // zoom level (0 = zoomed out)
           })
          });
         
          layer_temp = new ol.layer.Tile({
           source: new ol.source.XYZ({
           url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid='+key}),
           opacity:0.4
          });
          setTimeout(function () {
           map.addLayer(layer_temp); // a temp layer on map
           // Update container size
           map.updateSize()
         }, 400)

         
       

         } else {
         // What to do when the request has failed
         console.log('error', xhr);
         }
     
        }
     
        var forecast_C=document.getElementById("Celcious_id").checked;
        var forecast_F=document.getElementById("Fahrenheit_id").checked;

        var user_unit;
        
        if(forecast_C===true){
        user_unit="metric";}
        
        if(forecast_F===true){
          user_unit="imperial";}

       var a="lat="+lat+"&"+"lon="+long+"&"+"units="+user_unit+"&APPID="+key;

       xhr.open("GET","https://api.openweathermap.org/data/2.5/weather?"+a);

       xhr.send(a);
        
       console.log("form submission intercepted");

    };

function ForecastWeather(lat,long){
    var key="d9b43feda451d7c9e7c0fdd012120862";

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
 
    if (xhr.readyState !== 4){
    return;
    }
    
    if (xhr.status >= 200 && xhr.status < 300) {
     // What to do when the request is successful
     console.log(JSON.parse(xhr.responseText));
 
     var resp=JSON.parse(xhr.responseText)
   
     var time_24_hours=[];
     
     for(let i=0;i<8;i++){
     time_24_hours[i]=resp.list[i].dt;
     console.log(time_24_hours[i]);
    }
     var dt=[];
     var temp_24_hours=[];
     var press_24_=[];
     var humidity_24=[];
     var main_24=[];
     var dec_24=[];
     var icon_24=[];
     var all_24=[];
     var speed_24=[];
     var name_24=[];
     
     var forecast_C1=document.getElementById("Celcious_id").checked;
     var forecast_F2=document.getElementById("Fahrenheit_id").checked;

     if(forecast_C1===true){
            var temp_metric="&ordmC";
            var press_metric="hPa";
            var wind_metric="meters / sec";}
          
          
      if(forecast_F2===true){
        var temp_metric="&ordmF";
        var press_metric="Mb";
        var wind_metric="miles / hour";}


     for(let i=0;i<8;i++){
        dt[i]=resp.list[i].dt;
        temp_24_hours[i]=resp.list[i].main.temp;
        press_24_[i]=resp.list[i].main.pressure;
        humidity_24[i]=resp.list[i].main.humidity;
        main_24[i]=resp.list[i].weather[0].main;
        dec_24[i]=resp.list[i].weather[0].description;
        icon_24[i]=resp.list[i].weather[0].icon;
        all_24[i]=resp.list[i].clouds.all;
        speed_24[i]=resp.list[i].wind.speed;
        name_24[i]=resp.city.name;
        console.log(dt[i],temp_24_hours[i],press_24_[i], humidity_24[i],main_24[i],dec_24[i],all_24[i],icon_24[i], all_24[i],speed_24[i]);
       
    }

    for(let i=0;i<8;i++){
       date = new Date(dt[i]*1000);

       date2= new Date(dt[i]*1000);

       var var_time=document.getElementsByClassName("time")[i];

       var_time.innerHTML=date.getHours()+":"+date.getMinutes();

       
       var date2=date.getHours()+":"+date.getMinutes();

       console.log()

       var var_summary=document.getElementsByClassName("image_sum")[i];
      
       var_summary.innerHTML="<img src='http://openweathermap.org/img/wn/" +icon_24[i]+ ".png' >";

       var var_temp=document.getElementsByClassName("temp_24hours")[i];

       var_temp.innerHTML=temp_24_hours[i]+" "+temp_metric;

       var cloud_cover=document.getElementsByClassName("cloud_cover_id")[i];
     
       cloud_cover.innerHTML=all_24[i]+" %";

        month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

       //modal
       var weather_model=document.getElementsByClassName('modal-title')[i];
       weather_model.innerHTML="Weather in "+name_24[i]+" on " +date.getDate()+" "+month[date.getMonth()]+" "+date2;

       var modal_humidity=document.getElementsByClassName("model_humidity")[i];
       modal_humidity.innerHTML=humidity_24[i]+"%";

       var modal_img=document.getElementsByClassName("image_model")[i];
       modal_img.innerHTML="<img src='http://openweathermap.org/img/wn/" +icon_24[i]+ ".png' >";

       var modal_pressure=document.getElementsByClassName("model_pressure")[i];
       modal_pressure.innerHTML= press_24_[i];

       var modal_pressure=document.getElementsByClassName("model_pressure")[i];
       modal_pressure.innerHTML= press_24_[i]+" "+press_metric;
       
       var modal_dec=document.getElementsByClassName("mod_dec")[i];
       modal_dec.innerHTML=main_24[i]+" ("+dec_24[i]+")";

       var modal_speed=document.getElementsByClassName("model_wind")[i];
       modal_speed.innerHTML=speed_24[i]+" "+wind_metric;
    }

     } else {
     // What to do when the request has failed
     console.log('error', xhr);
     }
 
    }
 
    var forecast_C=document.getElementById("Celcious_id").checked;
    var forecast_F=document.getElementById("Fahrenheit_id").checked;

    var user_unit;
        
    if(forecast_C===true){
    user_unit="metric";}
        
        
    if(forecast_F===true){
    user_unit="imperial";}

    var a="lat="+lat+"&"+"lon="+long+"&"+"units="+user_unit+"&APPID="+key;
  
    xhr.open("GET","https://api.openweathermap.org/data/2.5/forecast?"+a);
 
    xhr.send(a);
 
    console.log("");
};



var modal = document.getElementsByClassName("modal")[0];
var btn = document.getElementsByClassName("btn btn-success")[0];
var close0=document.getElementsByClassName("btn btn-danger")[1];
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

close0.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
})

var modal1 = document.getElementsByClassName("modal")[1];
var btn1 = document.getElementsByClassName("btn btn-success")[1];
var close1=document.getElementsByClassName("btn btn-danger")[2];
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[1];

btn1.onclick = function() {
  modal1.style.display = "block";
}

span.onclick = function() {
  modal1.style.display = "none";
}

close1.onclick = function() {
  modal1.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal1.style.display = "none";
  }
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
})

var modal2 = document.getElementsByClassName("modal")[2];
var btn2 = document.getElementsByClassName("btn btn-success")[2];
var close2=document.getElementsByClassName("btn btn-danger")[3];


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[2];

btn2.onclick = function() {
  modal2.style.display = "block";
}

close2.onclick = function() {
  modal2.style.display = "none";
}
span.onclick = function() {
  modal2.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal2.style.display = "none";
  }
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
})


var modal3 = document.getElementsByClassName("modal")[3];
var btn3 = document.getElementsByClassName("btn btn-success")[3];
var close3=document.getElementsByClassName("btn btn-danger")[4];
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[3];

btn3.onclick = function() {
  modal3.style.display = "block";
}
close3.onclick = function() {
  modal3.style.display = "none";
}

span.onclick = function() {
  modal3.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal3.style.display = "none";
  }
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
})


var modal4 = document.getElementsByClassName("modal")[4];
var btn4 = document.getElementsByClassName("btn btn-success")[4];
var close4=document.getElementsByClassName("btn btn-danger")[5];
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[4];

btn4.onclick = function() {
  modal4.style.display = "block";
}

close4.onclick = function() {
  modal4.style.display = "none";
}

span.onclick = function() {
  modal4.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal4.style.display = "none";
  }
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
})


var modal5 = document.getElementsByClassName("modal")[5];
var btn5 = document.getElementsByClassName("btn btn-success")[5];
var close5=document.getElementsByClassName("btn btn-danger")[6];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[5];

btn5.onclick = function() {
  modal5.style.display = "block";
}

span.onclick = function() {
  modal5.style.display = "none";
}

close5.onclick = function() {
  modal5.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal5.style.display = "none";
  }
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
})

var modal6 = document.getElementsByClassName("modal")[6];
var btn6 = document.getElementsByClassName("btn btn-success")[6];
var close6=document.getElementsByClassName("btn btn-danger")[7];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[6];

btn6.onclick = function() {
  modal6.style.display = "block";
}

span.onclick = function() {
  modal6.style.display = "none";
}

close6.onclick = function() {
  modal6.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal6.style.display = "none";
  }
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
})

var modal7 = document.getElementsByClassName("modal")[7];
var btn7 = document.getElementsByClassName("btn btn-success")[7];
var close7=document.getElementsByClassName("btn btn-danger")[8];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[7];

btn7.onclick = function() {
  modal7.style.display = "block";
}

close7.onclick = function() {
  modal7.style.display = "none";
}

span.onclick = function() {
  modal7.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal7.style.display = "none";
  }
}

var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
})


var modal_server = document.getElementById("Modal_sever");
var btn_server= document.getElementById("server_button");
var close_s=document.getElementById("close_server");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("btn-close")[8];

btn_server.onclick = function() {
  modal_server.style.display = "block";
}

span.onclick = function() {
  modal_server.style.display = "none";
}

close_s.onclick = function() {
  modal_server.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal_server.style.display = "none";
  }
}


var search_button_appeared= document.getElementById("search_button");
var myTabContent=document.getElementById("myTabContent");
var rightnow=document.getElementById("rightnow");
var twenty_four_hours=document.getElementById("twenty_four_hours");
//var map=document.getElementById("map");

search_button_appeared.onclick = function() {
  myTabContent.style.display = "block";
  rightnow.style.display="block";
  twenty_four_hours.style.display="block";
  //map.style.display="block";
}



//var myModalEl = document.getElementById('Modal_server')
//myModalEl.addEventListener('hidden.bs.modal', function (event) {
  // do something...
//})