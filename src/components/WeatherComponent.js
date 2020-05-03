import React from "react";
import uuid from 'uuid';
import axios from 'axios';

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
        <center className='jumbotron mb-3 rounded-0'>
          <h1 className="mt-4 mb-4">React Weather</h1>
          <p id="error" className='mb-0'>Error: Unknown Place</p>
        </center>

        <div className="container-fluid">
          <div className="row">
            {
              this.state.cards && this.state.cards.map(card => (
                <div key={card.id} className="col-sm-12 col-md-4">
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h4 className="card-title">{card.title}</h4>
                      <p className="card-text">{card.body}</p>
                      <button onClick={() => this.removeCard(card.id)} className="btn-danger rounded">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            }

            <div className="card text-white bg-dark ml-3 col-sm-12 col-md-2">
              <div className="card-body">
                <h4 className="card-title">New Country?</h4>
                <p className="card-text"><input className="card-text" type="text" id="input"></input></p>
                <button onClick={() => {this.addElement()}} className="btn-success rounded">Submit</button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherComponent;