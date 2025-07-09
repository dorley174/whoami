import React from 'react';
import Link from 'next/link';
import styles from '@/css/rooms.module.css';

const RoomsPage: React.FC = () => {
  return (
    <>
      <div className={styles.buttons}>
        <h1 style={{ color: '#8e0000' }}>Choose room option</h1>
        <Link className={styles.button} href="/create">
          Create Room
        </Link>
        <Link className={styles.altbutton} href="/join">
          Join Game
        </Link>
      </div>
    </>
  );
};

export default RoomsPage;
