import React from "react";
import { useParams, useLocation } from 'react-router-dom';

import ExchangeDetailContext from "./ExchangeDetailContext";
import ExchangeDetail from "./ExchangeDetail";

function ExchangeDetailPage(props) {
  const { state } = useLocation();
  const { exchangeId } = useParams();
  return (
    <ExchangeDetailContext.Provider value={state}>
      <ExchangeDetail exchangeId={exchangeId}/>
    </ExchangeDetailContext.Provider>
  )
}

export default ExchangeDetailPage;
