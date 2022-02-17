import React from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import "./Cards.css";
import { Icon } from "@mui/material";
function ModalInfo(props) {
  const pokemonCard = props.pokemonCard;
  const tcgPrices = props.tcgPrices;

  const Prices = () => {
    if (tcgPrices.prices !== undefined) {
      let objectLength = Object.keys(tcgPrices.prices);

      return objectLength.map((item) => (
        <h3>
          <strong>{item.toLocaleUpperCase()}:</strong> ${" "}
          {tcgPrices.prices[item].mid.toFixed(2)}
        </h3>
      ));
    }
    return <> </>;
  };
  return (
    <div className="modalBody">
      <CloseIcon className="closeIcon" onClick={() => props.onHide()} />
      <div className="row">
        <div className="col-4 leftColumn">
          <img
            className="modalImage"
            src={pokemonCard.images.small}
            alt={pokemonCard.name}
            loading="lazy"
          />
        </div>

        <div className="col-12 col-lg">
          <div className=" col modalInfo">
            <h2>
              <strong>Average Prices:</strong>
            </h2>
            <h3>
              <Prices />
            </h3>
            <h4>
              <a
                href={pokemonCard.tcgplayer.url}
                target="_blank"
                rel="noreferrer"
              >
                Card at TCG Player
              </a>
            </h4>
          </div>
          {pokemonCard.holo === "TRUE" ? (
            <div className="row col">
              <h5 className="col">
                Holo <CheckBoxIcon color="warning" />
              </h5>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-4 leftColumn">
          <h2 className="modalInfo">
            <strong>NAME:</strong>
            <br /> {pokemonCard.name}
          </h2>
          <h3 className="modalInfo">
            <strong>RARITY: </strong>
            <br />
            {pokemonCard.rarity}
          </h3>
          {!pokemonCard.types ? (
            <h4 className="modalInfo">
              <strong>TYPE: </strong>
              <br /> {pokemonCard.subtypes}
            </h4>
          ) : (
            <h4 className="modalInfo">
              <strong>TYPE: </strong>
              <br /> {pokemonCard.types}
            </h4>
          )}
        </div>
        <div className="row col">
          <h2 className="modalInfo">
            <strong>STATUS: </strong>
            <br />
            {pokemonCard.owned !== 0 && pokemonCard.owned
              ? pokemonCard.owned + " Owned"
              : "Needed"}
          </h2>

          {pokemonCard.evolvesFrom ? (
            <h3 className="modalInfo">
              <strong>Evolves From:</strong>
              <br /> {pokemonCard.evolvesFrom}
            </h3>
          ) : (
            <h3>
              {" "}
              <br />{" "}
            </h3>
          )}
          {pokemonCard.evolvesTo ? (
            <h4 className="modalInfo">
              <strong>Evolves To:</strong>
              <br /> {pokemonCard.evolvesTo}
            </h4>
          ) : (
            <h4>
              {" "}
              <br />{" "}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalInfo;
