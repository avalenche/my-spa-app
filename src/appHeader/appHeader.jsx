import React from "react";
import { NavLink } from "react-router-dom"
import { Menu } from 'antd';
import styles from "./appHeader.module.css"

const { active, header } = styles;

const items = [
  {
    label: 'Home',
    key: 'home'
  },
  {
    label: 'Add Candidates',
    key: 'add'
  }]


const setAcvite = ({ isActive }) => isActive ? active : '';

const AppHeader = () => {

  return <Menu expandIcon={<div>+</div>} onClick={() => { }} mode="horizontal" selectedKeys={['mail']} items={items} />;
  /* return (
 
     <header className={header}>
       <NavLink to="/" className={setAcvite} >Home</NavLink>
       <NavLink to="/add" className={setAcvite}>Add Candidate</NavLink>
     </header>
 
   );
 */
};

export default AppHeader;
