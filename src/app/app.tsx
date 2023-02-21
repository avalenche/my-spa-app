import React from 'react';
import { Provider } from 'react-redux';

import styles from './app.module.scss'; 

import AboutCandidate from "../pages/aboutCandidate";
import AddCandidate from "../pages/addCandidate";
import AppHeader from "../components/appHeader";
import HomePage from "../pages/homePage";
import NotFoundPage from '../pages/notFound';
import { Routes, Route } from "react-router-dom";
import { store } from 'store';

const App: React.FC = () => {  
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <AppHeader />  
        <Routes >
        <Route path='/' element={<HomePage />} />
        <Route path='/about/:id' element={<AboutCandidate />} />
        <Route path='/add' element={<AddCandidate />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </Provider>
      
    </div>
  );
};

export default App;