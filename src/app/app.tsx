import React from 'react';

import styles from './app.module.scss'; 

import AboutCandidate from "../pages/aboutCandidate";
import AddCandidate from "../pages/addCandidate";
import AppHeader from "../components/appHeader";
import HomePage from "../pages/homePage";
import NotFoundPage from '../pages/notFound';
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {  
  return (
    <div className={styles.app}>
      <AppHeader />  
        <Routes >
        <Route path='/' element={<HomePage />} />
        <Route path='/about/:id' element={<AboutCandidate />} />
        <Route path='/add' element={<AddCandidate />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;