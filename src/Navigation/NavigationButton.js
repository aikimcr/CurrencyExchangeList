// This whole class may not be useful.  I should
// use "Link" instead?  Maybe?
import React from "react";
import { useNavigate } from 'react-router-dom';
import { buildDestination, buildHandler } from "./Navigator";

function NavigationButton(props) {
  const navigate = useNavigate();
  const destination = buildDestination(props);
  const handleClick = props.handleClick || buildHandler(navigate, props.navigationHandler);

  function clickEvtHandler(evt) {
    handleClick(destination, props.newState || {});
  }

  return (<button className={props.className} onClick={clickEvtHandler}>{props.children}</button>);
}

export default NavigationButton;
