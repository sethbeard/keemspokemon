import { TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { CloseButton } from "react-bootstrap";
import "../App.css";
function SideBar(props) {
  const node = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousdown", handleClick);
    };
  }, []);

  //handles clicks outside of the sidebar/nav to close it.
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    props.closeNav();
  };
  return (
    <div className="sidenav" ref={node} style={{ width: props.width }}>
      <div className="sidenavInner">
        <CloseButton className="closebtn" onClick={() => props.closeNav()} />
        <div>
          <h2>Search</h2>
          <div className="row search">
            <TextField
              className="searchName"
              variant="filled"
              label="Name"
              size="large"
              onChange={(value) => props.searchCardsByName(value)}
            />
          </div>
        </div>
        <div className="setSelectorSide">
          <h1 onClick={props.handleShow}>
            <strong> Current Set: </strong>
            <br /> {props.currentSet.name}
          </h1>
        </div>
        <div className="setSelectorSide">
          <h1 onClick={() => props.setTheme("")}>
            <strong> Current Theme: </strong>
            <br /> {props.theme}
          </h1>
        </div>
        <div className="selectSideDiv">
          <select
            className="selectSide"
            value={props.filter}
            defaultValue="All Cards"
            label="Filter"
            onChange={(event) => props.filterSetup(event.target.value)}
          >
            <option value="all">All Cards</option>
            <option value="owned">Owned Cards</option>
            <option value="needed">Needed Cards</option>
            <option value="dibs">Cards for Trade</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
