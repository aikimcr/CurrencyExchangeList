import React from "react";
import { useParams, useLocation } from 'react-router-dom';

import ExchangeDetailContext from "./ExchangeDetailContext";
import ExchangeDetail from "./ExchangeDetail";
import ErrorBoundary from "../ErrorBoundary";

function ExchangeDetailPage(props) {
  const { state } = useLocation();
  const { exchangeId } = useParams();
  return (
    <ExchangeDetailContext.Provider value={state}>
      <ErrorBoundary>
        <ExchangeDetail exchangeId={exchangeId}/>
      </ErrorBoundary>
    </ExchangeDetailContext.Provider>
  )
}

export default ExchangeDetailPage;
