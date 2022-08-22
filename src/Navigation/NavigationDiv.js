import React from "react";
import { BrowserRouter, useNavigate } from 'react-router-dom';

function NavigationDivHelper(props) {
  const navigate = useNavigate();

  const handleClick = props.handleClick || function() {
    const newState = props.state || {};
    navigate(props.path, {replace: false, state: newState});
  }

  return (<div onClick={handleClick}>{props.children}</div>);
}

function NavigationDiv(props) {
  return (
    <BrowserRouter>
      <NavigationDivHelper state={props.state} path={props.path} children={props.children} handleClick={props.handleClick} />
    </BrowserRouter>
  )
}

export default NavigationDiv;
