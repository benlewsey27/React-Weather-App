import React from "react";
import WeatherCard from "./components/Weather-Card";
import axios from 'axios';
import './App.css'

const { API_Key } = require('./config.json');

class App extends React.Component {
  state = {
    cards: []
  };

  async getTempature(place){
    // Get API_Key from https://openweathermap.org/api
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${API_Key}`);
      
    console.log(response)

      const temp = Math.round((response.data.main.temp - 273.15)*10)/10
      return temp;
  }

  formatTitle(title){
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  async addElement() {
    const inputForm = document.getElementById("input");
    const errorMessage = document.getElementById("error");

    if (inputForm.value) {
      try{
        const title = this.formatTitle(inputForm.value);
        const temp = await this.getTempature(title);
      
        const body = `The tempature is ${temp} degrees celcius.`

        inputForm.value = "";
        errorMessage.style.display = 'none';

        const newArray = this.state.cards.concat({ title: title, body: body });
        this.setState({
          cards: newArray
        });
      }catch(err){
        console.log(err);
        errorMessage.style.display = 'block';
        inputForm.value = "";
      }
    }
  }

  render() {
    return (
      <div>
        <center className='jumbotron mb-0 rounded-0'>
          <h1 className="mt-4 mb-4">React Weather</h1>
          <input type="text" id="input"></input>
          <button className='mb-4 ml-2 rounded' onClick={() => {this.addElement()}}>Submit</button>
          <p id="error" className='mb-0'>Error: Unknown Place</p>
        </center>
        <WeatherCard cards={this.state.cards} />
      </div>
    );
  }
}

export default App;
