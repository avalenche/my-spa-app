import React from "react";
//import { Button, DatePicker } from "antd";
//import { WifiOutlined } from "@ant-design/icons";
import styles from "./app.module.css";
import AboutCandidate from "../pages/aboutCandidate";
import AddCandidate from "../pages/addCandidate";
import AppHeader from "../components/appHeader";
import HomePage from "../pages/homePage";
import NotFoundPage from '../pages/notFound';
import { Routes, Route } from "react-router-dom";
const app = styles.app;

const App = () => {
  return (
    <div className={app}>
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

/* 
className={app}
<DatePicker />
      <Button type="text" icon={<WifiOutlined />}>
        My Button{" "}
      </Button>
      <AboutCandidate></AboutCandidate>
      <AddCandidate></AddCandidate> 
*/
