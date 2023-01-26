import React from "react";
//import styles from "./homePage.module.css"
import PageTitle from '../../components/PageTitle';
import TitleTable from '../../components/TitleTable';

const HomePage = () => {

  return (
    <div >
      <PageTitle title="Candidates:" />

      <TitleTable />
    </div>
  );
};

export default HomePage;
