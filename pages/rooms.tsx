import React from 'react';
import Link from 'next/link';
import styles from '@/css/rooms.module.css';

const RoomsPage: React.FC = () => {
  return (
    <main>
      <div className={styles.buttons}>
        <Link className={styles.button} href="/create">
          Create Room
        </Link>
        <Link className={styles.button} href="/join">
          Join Game
        </Link>
      </div>
    </main>
  );
};

export default RoomsPage;
