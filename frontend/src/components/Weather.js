import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import axios from "axios";

const Weather = () => {
  const [cards, setCards] = useState([]);

  const formatTitle = (title) => title.charAt(0).toUpperCase() + title.slice(1);

  const removeCard = (id) => {
    const newArray = cards.filter((item) => item.id !== id);
    setCards(newArray);
  };

  const getTempature = async (city) => {
    const { data } = await axios.get(`/api/get-temp/${city}`);
    return data.temp;
  };

  // TODO: Use Conditional Formatting Instead!
  const addElement = async () => {
    const inputForm = document.getElementById("input");
    const errorAlert = document.getElementById("alert");

    if (inputForm.value) {
      try {
        const title = formatTitle(inputForm.value);
        const temp = await getTempature(title);

        const body = `The tempature is ${temp}\xB0C.`;

        inputForm.value = "";
        errorAlert.classList.add("d-none");

        const newArray = cards.concat({
          id: uuidv1(),
          title: title,
          body: body,
        });

        setCards(newArray);
      } catch (err) {
        console.log(err);

        inputForm.value = "";
        errorAlert.classList.remove("d-none");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="alert alert-danger d-none" id="alert">
          <strong>404 Error:</strong> City not found
        </div>

        <div className="row">
          {cards &&
            cards.map((card) => (
              <div key={card.id} className="col-sm-12 col-md-4">
                <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                    <h4 className="card-title">{card.title}</h4>
                    <p className="card-text">{card.body}</p>
                    <br />
                    <button
                      onClick={() => removeCard(card.id)}
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
                  onClick={() => addElement()}
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
};

export default Weather;
