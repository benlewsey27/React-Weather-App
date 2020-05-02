import React from "react";

class WeatherCard extends React.Component {
  sendData = (title) => {
    this.props.removeCard(title);
  }
  
  render() {
    return (
      <div>
        {this.props.cards.map(card => (
          <div key={card.id}>
            <div className="card rounded-0">
              <div className="card-body">
                <u>
                  <h5 className="card-title">{card.title}</h5>
                </u>
                <p className="card-text">{card.body}</p>
                <button onClick={() => this.sendData(card.id)} className="btn-danger rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default WeatherCard;