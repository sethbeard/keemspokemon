import React from "react";
import PokemonCard from "./PokemonCard";
import "../App.css";

function Cards(props) {
  let gottaCatchThemAll = props.allCards.map((card) => (
    <PokemonCard key={card.id} pokemonCard={card} />
  ));

  return <div className="row cards">{gottaCatchThemAll}</div>;
}

export default Cards;
