import React from 'react';
import Image from 'next/image';
import styles from '@/css/rules.module.css';

const RulesPage: React.FC = () => {
  return (
    <>
      <p className={styles.rulestitle}>
        {' '}
        <strong>Who Am I?</strong> game rules
      </p>
      <div className={styles.rules}>
        <section className={styles.rule}>
          <p className={styles.ruledesc}>
            <strong>1. Guess</strong> some creature to each other{' '}
          </p>
          <div className={styles.card1}>
            <input type="text" placeholder="Nicolas Cage" className={styles.playerguess} />
            <Image
              width={250}
              height={300}
              className={styles.cardimg}
              src="/person.jpg"
              alt="empty person"
            />
            <p>FEWD fun #1</p>
          </div>
        </section>

        <section className={styles.rule}>
          <p className={styles.ruledesc}>
            <strong>2.</strong> Ask Y/N questions to guess <strong>your</strong> person
          </p>
          <div className={styles.card2}>
            <textarea
              rows={5}
              cols={40}
              className={styles.playernotes}
              placeholder="Am I an NPC in some game?"
            />
          </div>
        </section>

        <section className={styles.rule}>
          <p className={styles.ruledesc}>
            <strong>3.</strong> If the answer to your question is <strong>YES</strong>, you can ask
            one more question.<br></br>If there is answer <strong>NO</strong>, then turn goes to the
            next player
          </p>
          <div className={styles.card2}>
            <textarea
              rows={5}
              cols={40}
              className={styles.playernotes}
              placeholder={
                'Am I an NPC in some game? - YES\nIs this game popular? - YES\nIs this Steam game? - NO'
              }
            />
          </div>
        </section>

        <section className={styles.rule}>
          <p className={styles.ruledesc}>
            <strong>4.</strong> Play until <strong>all creatures guessed</strong>
          </p>
        </section>
      </div>
    </>
  );
};

export default RulesPage;
