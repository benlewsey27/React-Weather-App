import React from "react";
import uuid from "uuid";
import axios from "axios";

class Weather extends React.Component {
  state = {
    cards: [],
  };

  removeCard(id) {
    let newArray = this.state.cards.filter((item) => item.id !== id);

    this.setState({
      cards: newArray,
    });
  }

  async getTempature(city) {
    const { data } = await axios.get(
      `/api/get-temp/${city}`
    );

    return data.temp;
  }

  formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  async addElement() {
    const inputForm = document.getElementById("input");
    const errorAlert = document.getElementById("alert");

    if (inputForm.value) {
      try {
        const title = this.formatTitle(inputForm.value);
        const temp = await this.getTempature(title);

        const body = `The tempature is ${temp}\xB0C.`;

        inputForm.value = "";
        errorAlert.classList.add("d-none");

        const newArray = this.state.cards.concat({
          id: uuid.v1(),
          title: title,
          body: body,
        });
        this.setState({
          cards: newArray,
        });
      } catch (err) {
        console.log(err);

        inputForm.value = "";
        errorAlert.classList.remove("d-none");
      }
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="alert alert-danger d-none" id="alert">
            <strong>404 Error:</strong> City not found
          </div>

          <div className="row">
            {this.state.cards &&
              this.state.cards.map((card) => (
                <div key={card.id} className="col-sm-12 col-md-4">
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h4 className="card-title">{card.title}</h4>
                      <p className="card-text">{card.body}</p>
                      <br />
                      <button
                        onClick={() => this.removeCard(card.id)}
                        className="btn-danger rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            <div className="col-md-4">
              <div className="card text-black bg-light mb-3">
                <div className="card-body">
                  <h4 className="card-title">Add City</h4>
                  <div>
                    <input className="mb-2" type="text" id="input"></input>
                  </div>
                  <br />
                  <button
                    onClick={() => this.addElement()}
                    className="btn-success rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
