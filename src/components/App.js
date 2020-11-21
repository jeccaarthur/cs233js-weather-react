import React, { Component } from 'react';
import './App.css';
import ZipForm from './ZipForm';
import getLocation from '../utilities/googleMaps';
import WeatherList from './WeatherList';
import CurrentDay from './CurrentDay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: "",
      city: {},
      forecast: [],
      selectedDate: null
    };

    this.url = "https://api.openweathermap.org/data/2.5/onecall?";
    this.apikey = "&exclude=minutely,hourly,current&units=imperial&appid=b09b222824932a26154271e525b53043";

    // bind event handlers
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDayClicked = this.onDayClicked.bind(this);
  }

  render() {
    const { forecast, timezoneOffset, selectedDate, city } = this.state;
    return (
      <div id="app-container"><div className="app">
        <ZipForm onSubmit={this.onFormSubmit} />
        <WeatherList forecastDays={forecast}
          timezoneOffset={timezoneOffset}
          onDayClicked={this.onDayClicked} />
        {selectedDate !== null &&
          <CurrentDay forecastDay={forecast[selectedDate]}
            city={city} timezoneOffset={timezoneOffset} />}
      </div></div>
    );
  }

  onFormSubmit(zipcode) {
    getLocation(zipcode)
      .then(data => {
        const name = data.results[0].address_components[1].long_name;
        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;
        fetch(`${this.url}lat=${lat}&lon=${lng}${this.apikey}`)
          .then(response => response.json())
          .then(data => {
            const timezoneOffset = data.timezone_offset;
            // sometimes there are 8 days
            data.daily.splice(7);
            const forecast = data.daily;
            this.setState({
              zipcode, forecast, timezoneOffset,
              selectedDate: null,
              city: { name, lat, lng }
            });
          })
          .catch(error => {
            alert('There was a problem getting weather info!');
          });
      })
      .catch(error => {
        alert('There was a problem getting location information!')
      });
  }

  onDayClicked(dayIndex) {
    this.setState({ selectedDate: dayIndex });
  }
}

export default App;