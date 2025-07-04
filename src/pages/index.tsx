import React from 'react';
import Link from 'next/link';
import styles from "../css/styles.module.css"

const HomePage: React.FC = () => {
  return (
    <main>
      <div className={styles.headertitle}>
        <div className={styles.headersubtitle}>
          <div className={styles.headerspan}>
            <span className={styles.block}>Guess.</span>
            <span className={styles.block}>Play.</span>
            <span className={styles.block}>Enjoy.</span>
          </div>
          <Link href="/menu" className={styles.playbutton}>
            <p>Start</p>
          </Link>
        </div>
        <div className={styles.headerdesc}>
          <p><strong>Who Am I</strong>  isn’t just a game—it’s an explosion of emotions where every word becomes the key to success. It’s a battle of quick thinking, wit, and teamwork that turns any gathering into an unforgettable experience.</p>
        </div> 
        
      </div>
      
    </main>
  );
};

export default HomePage;
