import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componets',
  templateUrl: './componets.component.html',
  styleUrls: ['./componets.component.css']
})
export class ComponetsComponent implements OnInit {
  WeatherData:any;

  constructor() { }

  ngOnInit() {
    this.WeatherData={
      main : {},
      isDay:true
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }
  getWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=87c8ba72c82abdd94da8ad2314271173`)
    .then(res=>res.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.8479,"lat":19.0144},"weather":[{"id":711,"main":"Smoke","description":"smoke","icon":"50d"}],"base":"stations","main":{"temp":305.14,"feels_like":304.33,"temp_min":302.09,"temp_max":305.14,"pressure":1012,"humidity":33},"visibility":4000,"wind":{"speed":3.09,"deg":300},"clouds":{"all":37},"dt":1667736996,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1667697065,"sunset":1667738001},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}')
    // this.setweatherData(data);
  }
  
  setWeatherData(data:any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }
}

