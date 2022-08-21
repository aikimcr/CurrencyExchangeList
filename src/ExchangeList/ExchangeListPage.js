import React from "react";
import { useParams } from 'react-router-dom';

import ExchangeListContainer from "./ExchangeListContainer";

function ExchangeListPage(props) {
  debugger;
  const params = useParams();

  const page =  1;
  return <ExchangeListContainer page={page}/>
}

export default ExchangeListPage;
