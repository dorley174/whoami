import React from 'react';
import Link from 'next/link';
import styles from '@/css/index.module.css';

const HomePage: React.FC = () => {
  return (
    <>
      <div className={styles.headertitle}>
        <div className={styles.headersubtitle}>
          <div className={styles.headerspan}>
            <span className={styles.block}>Guess.</span>
            <span className={styles.block}>Play.</span>
            <span className={styles.block}>Enjoy.</span>
          </div>
          <Link href="/rooms" className={styles.playbutton}>
            <p>Start</p>
          </Link>
        </div>
        <div className={styles.headerdesc}>
          <p>
            <strong>Who Am I</strong> is a simple and very exciting game. Plunge into the world of
            logic by making a character from our world, as well as guess the one whom you were made.
            Now this unforgettable experience can be obtained even online!
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
