import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Wrapper from './pages/Wrapper';
import ReputationPage from './pages/Reputation';

function App(): JSX.Element {
  const [walletId, setWalletId] = useState<string | null>(null); // Fixed destructuring of useState

  

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home walletId={walletId} setWalletId={setWalletId} />} 
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard walletId={walletId} setWalletId={setWalletId} />} 
        />
        <Route 
          path="/dashboard/wrapper" 
          element={<Wrapper walletId={walletId} setWalletId={setWalletId} />} 
        />
        <Route 
          path="/dashboard/reputation" 
          element={<ReputationPage walletId={walletId} setWalletId={setWalletId} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
