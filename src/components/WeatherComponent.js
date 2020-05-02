import React from "react";
import uuid from 'uuid';
import axios from 'axios';

import WeatherCard from "./WeatherCard";

class WeatherComponent extends React.Component {
  state = {
    cards: []
  };

  removeCard(id){
    let newArray = this.state.cards.filter((item) => item.id !== id);

    this.setState({
      cards: newArray
    })
  }

  async getTempature(place){
    // Get API_Key from https://openweathermap.org/api
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`);

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

        const newArray = this.state.cards.concat({ id: uuid.v1(), title: title, body: body });
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
        <WeatherCard cards={this.state.cards} removeCard={this.removeCard.bind(this)} />
      </div>
    );
  }
}

export default WeatherComponent;