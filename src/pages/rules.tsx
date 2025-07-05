import React from 'react';
import HeaderPage from '../components/header';
import FooterPage from '../components/footer';
import styles from "../css/rules.module.css";

const RulesPage: React.FC = () => {
  return (
    
    <main>
      <HeaderPage></HeaderPage>
      <p className={styles.rulestitle}> <strong>Who Am I?</strong> game rules</p>
      <div className={styles.rules}>

        <section className={styles.rule}>
          <p className={styles.ruledesc}><strong>1. Guess</strong> some creature to each other </p>
          <div className={styles.card}>
            <p className={styles.cardinput}>Nicolas Cage</p>
            <img className={styles.cardimg} src="/person.jpg" alt="empty person" />
          </div>
        </section>

        <section className={styles.rule}>
          <p className={styles.ruledesc}><strong>2.</strong> Ask Y/N questions to guess <strong>your</strong> person</p>
          <div className={styles.card}>
            <textarea rows={5} cols={40} className={styles.cardinput} placeholder='Am I an NPC in some game?'/>
          </div>
        </section>

        <section className={styles.rule}>
          <p className={styles.ruledesc}><strong>3.</strong> If the answer to your question is <strong>YES</strong>, you can ask one more question.<br></br>If there is answer<strong>NO</strong>, then turn goes to the next player</p>
          <div className={styles.card}>
            <textarea rows={5} cols={40} className={styles.cardinput} placeholder={'Am I an NPC in some game? - YES\nIs this game popular? - YES\nIs this Steam game? - NO'}/>
          </div>
        </section>

        <section className={styles.rule}>
          <p className={styles.ruledesc}><strong>4.</strong> Repeat asking until <strong>all creatures guessed</strong></p>
          
        </section>
      </div>
      <FooterPage></FooterPage>
    </main>
  );
};

export default RulesPage;
