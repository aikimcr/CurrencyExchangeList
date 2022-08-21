import React from "react";

function ShowUrl(props) {
  const description = props.description || props.url;
  return <a href={props.url} target="_blank" rel="noreferror">{description}</a>;
}

export default ShowUrl;
