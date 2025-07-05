import React from 'react';
import HeaderPage from '../components/header';
import FooterPage from '../components/footer';
import styles from "../css/rules.module.css";

const RulesPage: React.FC = () => {
  return (
    
    <main>
      <HeaderPage></HeaderPage>
      <div className={styles.rules}>

        <section className={styles.rule}>
          <p>1. Guess some creature to each other </p>
          <div className={styles.card}>
            <input className={styles.cardinput} type="text" placeholder='Nicolas Cage'/>
            <img className={styles.cardimg} src="/person.jpg" alt="empty person" />
          </div>
        </section>

        <section className={styles.rule}>
          <p>2. Ask Y/N questions to guess <strong>your</strong> person</p>
          <div className={styles.card}>
            <textarea rows={5} cols={40} className={styles.cardinput} placeholder='Am I a real guy?'/>
            
          </div>
        </section>
      </div>
      <FooterPage></FooterPage>
    </main>
  );
};

export default RulesPage;
