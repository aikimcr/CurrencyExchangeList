import React, { useEffect, useState } from 'react';
import '../Exchange.scss';
import { useLocation } from 'react-router-dom';

import ExchangeListContext from "./ExchangeListContext";
import ExchangeListContainer from "./ExchangeListContainer";

function ExchangeListPage(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const startingPage =  searchParams.has('page') ? Number(searchParams.get('page')) : 1;

  // TODO: Don't add the searchParams if page === 1
  const [pageState, setPageState] = useState({page: startingPage});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('page')) {
      const newPage = Number(searchParams.get('page'));

      if (newPage !== pageState.page) {
        setPageState({page: newPage});
      }
    } else if (pageState.page !== 1) {
      setPageState({page: 1});
    }
  }, [location, pageState.page]);

  return (
    <ExchangeListContext.Provider value={pageState}>
      <ExchangeListContainer page={pageState.page} />
    </ExchangeListContext.Provider>
  );
}

export default ExchangeListPage;
