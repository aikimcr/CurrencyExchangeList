import React from "react";
import { BrowserRouter, useNavigate } from 'react-router-dom';

function NavigationButtonHelper(props) {
  const navigate = useNavigate();

  const handleClick = props.handleClick || function() {
    const newState = props.state || {};
    navigate(props.path, {replace: false, state: newState});
  }

  return (<button onClick={handleClick}>{props.children}</button>);
}

function NavigationButton(props) {
  return (
    <BrowserRouter>
      <NavigationButtonHelper state={props.state} path={props.path} children={props.children} handleClick={props.handleClick} />
    </BrowserRouter>
  )
}

export default NavigationButton;
