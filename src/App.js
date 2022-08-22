import './App.css';
import { Routes, Route, useSearchParams } from 'react-router-dom';

import ExchangeListPage from './ExchangeList/ExchangeListPage';
import ExchangeDetailPage from './ExchangeDetail/ExchangeDetailPage';

function App(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Routes>
      <Route path="/" element={
        <ExchangeListPage search={searchParams.toString()} />
      }></Route>
      <Route path="exchange/:exchangeId" element={
        <ExchangeDetailPage search={searchParams.toString()} />
      }></Route>
    </Routes>
  );
}

export default App;
