import "./App.css";
import Cards from "./components/Cards";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import allSets from "./pokemonSets/allSets";
import React from "react";
import { Modal } from "react-bootstrap";
import AllSets from "./components/AllSets";
import squirtle from "./pokemonColorPallets/squirtle";
import bulbasaur from "./pokemonColorPallets/bulbasaur";
import pikachu from "./pokemonColorPallets/pikachu";
import charmander from "./pokemonColorPallets/charmander";
import bidoof from "./pokemonColorPallets/bidoof";
import SideBar from "./components/SideBar";

function App() {
  const [currentSet, setCurrentSet] = useState(allSets[0]);
  const [allCards, setAllCards] = useState(currentSet.set);
  const [filteredCards, setFilteredCards] = useState(allCards);
  const [filter, setFilter] = useState("all");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [show, setShow] = useState(false);
  const [themeChosen, setThemeChosen] = useState("");
  const [sideWidth, setSideWidth] = useState(`0%`);
  const [themeName, setThemeName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => firstLoad(), []);

  //first load call to get the spreadsheet information and write the info to each card
  const firstLoad = async () => {
    await getSpreadsheetInfo().then(await getSetsInfo());
  };

  //gets the information from the spreadsheet for nubmer
  const getSpreadsheetInfo = async () => {
    //filters through every set each has a special id (the gid) which identifies each page of the spreadsheet
    await allSets.map((set) => {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMSYBFKeE0QZpfy5GHQx84bntB796aBt-bWgYKlJy1HSeFZv79cFBV4TIRck7wgQIgqqwuaFYexD2b/pub?gid=" +
        set.gid +
        "&single=true&output=csv";
      //uses papa parse to get the spreadsheet page
      Papa.parse(url, {
        download: true,
        header: true,
        //takes the results and calls the addprops function to write it to the cards
        complete: function async(results) {
          var data = results.data;
          data.map((card) => addProps(card, set));
        },
      });
    });
  };

  //function that adds the user data to the card
  const addProps = (card, set) => {
    let index = set.set.findIndex((element) => element.id === card.id);
    set.set[index] = {
      ...set.set[index],
      need: card.need,
      owned: card.owned,
      numberForTrade: card.numberForTrade,
      holo: card.holo,
    };
  };

  //similar to the getSpreadsheet function.  Uses papa parse to get the percentage owned of each set.
  const getSetsInfo = async () => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMSYBFKeE0QZpfy5GHQx84bntB796aBt-bWgYKlJy1HSeFZv79cFBV4TIRck7wgQIgqqwuaFYexD2b/pub?gid=1882286493&single=true&output=csv",
      {
        download: true,
        header: true,
        complete: function async(results) {
          var data = results.data;
          data.map((set) => addSetProps(set));
        },
      }
    );
  };

  //adds user info to the set
  const addSetProps = (set) => {
    let index = allSets.findIndex((element) => element.id === set.id);
    allSets[index] = {
      ...allSets[index],
      totalCards: set.totalCards,
      owned: set.owned,
      percentageOwned: set.percentageOwned,
    };
  };

  //used to filter shown cards, takes in a boolean to switch between Owned Cards and Not Owned cards
  const filterOwnedCards = (bool) => {
    setFilteredCards(allCards.filter((a) => a.need === bool));
  };

  //filters to only cards for trade
  const filterCardsForDib = () => {
    setFilteredCards(
      allCards.filter((a) => a.numberForTrade !== null && a.numberForTrade > 0)
    );
  };

  //sets up the filter, calling the appropriate function
  const filterSetup = (string) => {
    if (string === "owned") {
      filterOwnedCards("FALSE");
      setFilter(string);
    } else if (string === "dibs") {
      filterCardsForDib();
      setFilter(string);
    } else if (string === "needed") {
      filterOwnedCards("TRUE");
      setFilter(string);
    } else {
      setFilteredCards(allCards);
      setFilter("all");
    }
  };

  //search function
  const searchCardsByName = (query) => {
    setFilteredCards(
      allCards.filter((a) =>
        a.name.toLowerCase().includes(query.target.value.toLowerCase())
      )
    );
  };

  //opens the sidebar adjusting for different size screens
  const openNav = () => {
    if (window.innerWidth < 800) {
      setSideWidth("75%");
    } else if (window.innerWidth < 950) {
      setSideWidth("50%");
    } else {
      setSideWidth("25%");
    }
  };

  //closes the sidebar
  const closeNav = () => {
    setSideWidth("0%");
  };

  //takes care of all of the theme choices, reads the pokemon chosen,calls the function to update the variables
  //sets the background image accordingly
  //marks the theme chosen as true and sets the currently set theme name
  const changeTheme = (pokemon) => {
    if (pokemon === "bulbasaur") {
      bulbasaur();
      setBackgroundImage("bulbasaurcolorshadow.png");
      setThemeChosen(true);
      setThemeName("Bulbasaur");
    } else if (pokemon === "charmander") {
      charmander();
      setBackgroundImage("charmandercolorshadow.png");
      setThemeChosen(true);
      setThemeName("Charmander");
    } else if (pokemon === "squirtle") {
      squirtle();
      setBackgroundImage("squirtlecolorshadow.png");
      setThemeChosen(true);
      setThemeName("Squirtle");
    } else if (pokemon === "pikachu") {
      pikachu();
      setBackgroundImage("pikachucolorshadow.png");
      setThemeChosen(true);
      setThemeName("Pikachu");
    } else if (pokemon === "bidoof") {
      bidoof();
      setBackgroundImage("bidoofcolorshadow.png");
      setThemeChosen(true);
      setThemeName("Bidoof");
    } else {
      setThemeChosen(false);
    }
  };

  //function to change the set being viewed
  const changeSet = async (set) => {
    //changes the current set
    setCurrentSet(set);
    //loads in the cards from that set and then resets the filter/filtered cards
    setAllCards(set.set);
    setFilteredCards(set.set);
    setFilter("all");
  };

  return (
    <>
      {themeChosen == "" ? (
        <div className="startingPage row">
          <div className="col-12 col-lg-4">
            <h1 className="startingPageText">
              Choose
              <br />
              Your
              <br />
              Pokemon
            </h1>
          </div>
          <div className="frame col-12 col-lg-7">
            <div
              className="shadowImage"
              onClick={() => changeTheme("bulbasaur")}
            >
              <img
                className="shadow"
                alt="bulbasaur"
                src="/bulbasaurshadow.png"
              />
              <img className="color" alt="bulbasaur" src="/bulbasaur2.png" />
              <h2> Bulbasaur </h2>
            </div>
            <div
              className="shadowImage"
              onClick={() => changeTheme("charmander")}
            >
              <img
                className="shadow"
                alt="charmander"
                src="/charmandershadow.png"
              />
              <img className="color" alt="charmander" src="/charmander.png" />
              <h2> Charmander </h2>
            </div>
            <div
              className="shadowImage"
              onClick={() => changeTheme("squirtle")}
            >
              <img
                className="shadow"
                alt="squirtle"
                src="/squirtleshadow.png"
              />
              <img className="color" alt="squirtle" src="/squirtle.png" />
              <h2> Squirtle </h2>
            </div>
            <div className="shadowImage" onClick={() => changeTheme("pikachu")}>
              <img className="shadow" alt="pikachu" src="/pikachushadow.png" />
              <img className="color" alt="pikachu" src="/pikachu.png" />
              <h2> Pikachu </h2>
            </div>
            <div className="shadowImage" onClick={() => changeTheme("bidoof")}>
              <img className="shadow" alt="bidoof" src="/bidoofshadow.png" />
              <img className="color" alt="bidoof" src="/bidoof.png" />
              <h2> Bidoof </h2>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="App"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <SideBar
            closeNav={closeNav}
            searchCardsByName={searchCardsByName}
            width={sideWidth}
            filter={filter}
            filterSetup={filterSetup}
            handleShow={handleShow}
            currentSet={currentSet}
            theme={themeName}
            setTheme={setThemeChosen}
          />
          <header className="App-header row">
            <div className="col-3 setSelector">
              <h1 onClick={handleShow}>
                <strong> Current Set: </strong>
                <br /> {currentSet.name}
              </h1>
            </div>
            <div className="menuButton col">
              <div className="menuButtonInner" onClick={() => openNav()}>
                <img src="Daco_4662989.png" className="App-logo" alt="logo" />
                <h3>
                  <strong>Menu</strong>
                </h3>
              </div>
            </div>
            <div className="col-3 selectDiv">
              <select
                className="select"
                value={filter}
                defaultValue="All Cards"
                label="Filter"
                onChange={(event) => filterSetup(event.target.value)}
              >
                <option value="all">All Cards</option>
                <option value="owned">Owned Cards</option>
                <option value="needed">Needed Cards</option>
                <option value="dibs">Cards for Trade</option>
              </select>
            </div>
          </header>
          <div className="cardArea">
            <Cards allCards={filteredCards} />
            <Modal show={show} onHide={handleClose} size="lg" className="modal">
              <AllSets changeSet={changeSet} handleClose={handleClose} />
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
