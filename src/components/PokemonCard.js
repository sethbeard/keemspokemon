import React, { Suspense, useState } from "react";

import "./Cards.css";

import { Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import ModalInfo from "./ModalInfo";

function randomNumber() {
  let number = 0;
  while (number === 0) {
    number = Math.floor(Math.random() * 3 - 1);
  }

  return number + "deg";
}

function PokemonCard(props) {
  const [show, setShow] = useState(false);
  const [tcgPrices, setTcgPrices] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    getPokemonPrices();
    setShow(true);
  };
  let pokemonCard = props.pokemonCard;

  const getPokemonPrices = async () => {
    let url = "https://api.pokemontcg.io/v2/cards/" + pokemonCard.id;
    let response = await fetch(url, {
      headers: {
        "X-Api-Key": "e49dfbf0-e58a-49cb-bd90-65c5256eb5db",
        "Content-Type": "application/json",
      },
    });
    let res = await response.json();
    setTcgPrices(res.data.tcgplayer);
  };

  return (
    <>
      <div
        className="col-sm-10 col-md-6 col-xl-2 mainCard"
        style={{ "--hoverRotate": randomNumber() }}
        loading="lazy"
        onClick={handleShow}
      >
        <div className="cardFront">
          <div className="topRow">
            <div className="rarity row">
              <h4 className="rarityText">{pokemonCard.rarity}</h4>
            </div>
            <hr className="line " />
            <div className="numberDiv">
              <h4 className="pokemonNumber col">#{pokemonCard.number}</h4>
            </div>
          </div>
          <div className="row infoRow">
            <h4 className="col pokemonName">{pokemonCard.name}</h4>
          </div>

          <div className="imageContainer">
            <Suspense fallback={<Spinner />}>
              <img
                className="cardImage"
                src={pokemonCard.images.small}
                alt={pokemonCard.name}
                loading="lazy"
              />
            </Suspense>
          </div>
          <div className="row bodyRow"></div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" className="cardInfo">
        <ModalInfo
          pokemonCard={pokemonCard}
          tcgPrices={tcgPrices}
          onHide={handleClose}
        />
      </Modal>
    </>
  );
}

export default PokemonCard;
