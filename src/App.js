import './App.scss';
import { Routes, Route } from 'react-router-dom';

import ExchangeListPage from './ExchangeList/ExchangeListPage';
import ExchangeDetailPage from './ExchangeDetail/ExchangeDetailPage';

function App(props) {
  return (
    <Routes>
      <Route path="/" element={
        <ExchangeListPage />
      }></Route>
      <Route path="exchange/:exchangeId" element={
        <ExchangeDetailPage />
      }></Route>
    </Routes>
  );
}

export default App;
