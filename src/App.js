import './App.scss';
import { Routes, Route } from 'react-router-dom';

import ExchangeListPage from './ExchangeList/ExchangeListPage';
import ExchangeDetailPage from './ExchangeDetail/ExchangeDetailPage';
import ErrorBoundary from "./ErrorBoundary";


function App(props) {
  return (
    <div>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<ExchangeListPage />} />
          <Route path="exchange/:exchangeId" element={<ExchangeDetailPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
