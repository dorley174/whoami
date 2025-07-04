import React from 'react';
import HeaderPage from '../components/header';
import FooterPage from '../components/footer';

const RulesPage: React.FC = () => {
  return (
    
    <main>
      <HeaderPage></HeaderPage>
      <h1>О проекте</h1>
      <p>Здесь можно рассказать о приложении.</p>
      <FooterPage></FooterPage>
    </main>
  );
};

export default RulesPage;
