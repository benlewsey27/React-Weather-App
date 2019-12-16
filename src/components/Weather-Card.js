import React from "react";

const WeatherCard = props => {
  return (
    <div>
      {props.cards.map(card => (
        <div>
          <div className="card rounded-0">
            <div className="card-body">
              <u>
                <h5 className="card-title">{card.title}</h5>
              </u>
              <p className="card-text">{card.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherCard;