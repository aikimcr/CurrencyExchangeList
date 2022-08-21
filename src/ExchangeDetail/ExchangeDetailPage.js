import React from "react";
import { useParams } from 'react-router-dom';

import ExchangeDetail from "./ExchangeDetail";

function ExchangeDetailPage(props) {
  debugger;
  const page = 1;
  const { exchangeId } = useParams();
  return <ExchangeDetail page={page} exchangeId={exchangeId}/>
}

export default ExchangeDetailPage;
