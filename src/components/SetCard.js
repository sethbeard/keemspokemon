import React, { useState } from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import "./Sets.css";

function SetCard(props) {
  const [isLoading, setIsLoading] = useState(props.set.totalCards >= 0);
  const [symbolUrl, setSymbolUrl] = useState(
    "https://images.pokemontcg.io/" + props.set.id + "/symbol.png"
  );

  if (!isLoading) {
    return (
      <div className="col-5 setCard">
        <img src={symbolUrl} alt={props.set.name} />
        <h2>{props.set.name}</h2>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="col-2 setCard">
      <div onClick={() => props.changeSet(props.set)}>
        <img src={symbolUrl} alt={props.set.name} />
        <h2>{props.set.name}</h2>

        <ProgressBar
          animated
          min={20}
          label={`${props.set.percentageOwned}%`}
          now={props.set.percentageOwned}
        />
        <h2>
          {props.set.owned}/{props.set.totalCards} {props.set.percentageOwned}%
        </h2>
      </div>
    </div>
  );
}

export default SetCard;
