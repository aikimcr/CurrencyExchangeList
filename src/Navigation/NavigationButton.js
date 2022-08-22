import React from "react";
import { useNavigate } from 'react-router-dom';

function NavigationButton(props) {
  const navigate = useNavigate();

  const handleClick = props.handleClick || function() {
    const newState = props.state || {};
    navigate(props.path, {replace: false, state: newState});
  }

  return (<button onClick={handleClick}>{props.children}</button>);
}

export default NavigationButton;
