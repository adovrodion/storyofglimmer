import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import HistoryPage from './components/HistoryPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContainer />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
};

export default AppRoutes;
