
//import React from 'react';
import React, { useState } from 'react';

const api = { 
  key: "d350f9a0148737090671eac50f0ca020",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  // arrow function that takes a d (date) as param
  // in the div date, we pass the new date and the date builder 
  // then returns the date in the way we build the string
  ///////////////////////////////////////

  const [query, setQuery] = useState(''); // the '' represents an empty string
  const [weather, setWeather] = useState({}); // the {} re presents an empty object
  const search = evt => {
    if (evt.key === "Enter") {
      // now we send an api (GET) request to the api.base url
      // then we straightaway get the json from the response ( a json Promise)
      // then we pass it through another Promise,
      // 
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      // then we get the result and the result is going to return result.json
      .then(res => res.json()) // this is the endpoint
      .then(result => {
        setQuery(''); // set query back to an empty string
        setWeather(result);
        console.log(result);

      })

    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April",
     "May", "June", "July", "August", "September", 
     "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // we return a template string

   //return '${day} ${date} ${month} ${year}';
    return `${day}, ${date} ${month} ${year}`


  }
/* under the search box we will havethe location box 
   under the location box we have the weather-box that has the temp div
   under the temp div we have the weather , eg, sunny
*/

  return (
    <div className={
      (typeof weather.main != "undefined") ?
        ((weather.main.temp > 16) ?
          'app warm' : 'app')
      : 'app'}>
      <main>
        <div className="search-box">
          <input
          type="text"
          className= "search-bar"
          placeholder= "Search..."
          onChange= { e => setQuery(e.target.value)} // set the query to the target value
          // no we need to bind this value to the query
          value={query}
          onKeyPress={search} 
          />

        </div>

        {(typeof weather.main != "undefined") ? (
          // we need tis empty div below to hold all the other info
          // bc the ternary operator can only take in one div (!=)
          <div>
            <div className="location-box">
              <div className="location"> {weather.name}, {weather.sys.country} </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp"> 
              {Math.round(weather.main.temp)}°C
               </div>
              <div className="weather">
                {weather.weather[0].main}
                
                 </div>
            </div>

          </div>
        ) : ('')};
      </main>
    </div>
  );
}

export default App;
