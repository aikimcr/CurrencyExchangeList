// All the navigation things have common logic.  Consolidate it here.
// These are not React functions or classes and should not be.
// import React, { useEffect } from "react";
export function buildDestination(props) {
  let destination = props.path || '/';

  if (props.searchParams) {
    const searchParams = new URLSearchParams();

    for (const key in props.searchParams) {
      searchParams.set(key, props.searchParams[key]);
    }

    destination = `${destination}?${searchParams.toString()}`;
  }

  return destination;
}

// TODO: If I saved the state here, I could detect if the new state
//       matched the old one and use "navigate(-1)" when appropriate.
//       I might be able to do something similar going the other way.
export function buildHandler(navigate, navigationHandler) {
  const handleClick = function(url, newState={}) {
    const urlObject = new URL(url, document.baseURI);
    urlObject.searchParams.forEach((value, key) => { newState[key] = value });

    navigate(url, {state: newState});

    if (navigationHandler) {
      navigationHandler(url, newState);
    }
  }

  return handleClick;
}

export default buildHandler;
