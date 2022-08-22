import React from "react";
import { BrowserRouter, useNavigate } from 'react-router-dom';

function NavigationDiv(props) {
  const navigate = useNavigate();

  const handleClick = props.handleClick || function() {
    const newState = props.state || {};
    navigate(props.path, {replace: false, state: newState});
  }

  return (<div onClick={handleClick}>{props.children}</div>);
}

export default NavigationDiv;
