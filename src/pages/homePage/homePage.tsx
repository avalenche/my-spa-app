import React from "react";

import PageTitle from '../../components/PageTitle';
import TitleTable from '../../components/TitleTable';

const HomePage: React.FC = () => {

  return (
    <div >
      <PageTitle title="Candidates:" />
      <TitleTable />
    </div>
  );
};

export default HomePage;
