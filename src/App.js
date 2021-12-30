import React, { useEffect, useState } from 'react'
import "./index.css"

const App = () => {

  useEffect(()=>{
    getWeatherInfo();
  },[]);

  const[searchcity,setsearchcity] = useState("faisalabad");
  const[tempinfo,settempinfo] = useState({});
  const[weathericon,setweathericon] = useState()

  const getWeatherInfo = async() =>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&units=metric&appid=ea830e06004f849ae3242fe716f6ba13`
      
      let res = await fetch(url);
      let data = await res.json();
       const{name} = data;
      const{country} = data.sys;
      const{main:weathermood,description} = data.weather[0];
      const{temp,temp_min,temp_max,feels_like,humidity} = data.main;

      const myNewWeather = {
        name,
        country,
        weathermood,
        description,
        temp,
        temp_max,
        temp_min,
        feels_like,
        humidity,
      }

      settempinfo(myNewWeather);
      setsearchcity("")

      if(weathermood=="Sunny"){
        setweathericon("fa-sun")
      }
      else if(weathermood=="Clouds"){
        setweathericon("fa-cloud")
      }
      else if(weathermood=="Smoke"){
        setweathericon("fa-smog")
      }
      else if(weathermood=="Snow"){
        setweathericon("fa-snowflake")
      }
      else if(weathermood=="Rain"){
        setweathericon("fa-cloud-rain")
      }
      else{
        setweathericon("fa-sun")
      }
    }
    catch(error){
      console.log("Data Fetching Error");
    }
  }

  let currentYear = new Date;
   currentYear = currentYear.getFullYear();


  return (
    <>
      <div className="container box-outer">
      <div className="row mt-5">
      <div className="mb-3">
      <label for="exampleFormControlInput1" className="form-label" style={{fontWeight:"bold"}}>Search By City ...</label>
      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter City Name"
       value={searchcity} onChange={(e)=>{setsearchcity(e.target.value)}} />
      </div>
      <button className='btn btn-primary' onClick={getWeatherInfo}>Search</button>
      </div>
        <div className="row justify-content-center mt-5">
          <div className="col-10 text-center">
              <div className="box-inner">
              <i className={`fas ${weathericon}`} style={{fontSize:"100px"}}></i>
              <h2>{tempinfo.name} , {tempinfo.country}</h2>
              <h3>Weather Mood : {tempinfo.weathermood}</h3>
              <h3>{tempinfo.temp} °C</h3>
              <div className="row justify-content-around">
                <div className="col-5">Min Temp : {tempinfo.temp_min} °C</div>
                <div className="col-5">Max Temp : {tempinfo.temp_max} °C</div>
              </div>
              <p>Feels Like : {tempinfo.feels_like} °C</p>
              <p>Humidity : {tempinfo.humidity} %</p>
              <p>Description : {tempinfo.description}</p>
              </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <p>Designed and Developed By Abdul Rehman | {currentYear}</p>
        </div>
      </div>
    </>
  )
}

export default App;

