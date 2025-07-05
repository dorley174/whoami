import React from 'react';
import Link from 'next/link';
import HeaderPage from '../components/header';
import FooterPage from '../components/footer';
import styles from "../css/menu.module.css";

const MenuPage: React.FC = () => {
  return (
    <main>
      <HeaderPage></HeaderPage>
      <div className={styles.buttons}>
        <Link className={styles.button} href="/create">Create Room</Link>
        <Link className={styles.button} href="/join">Join Game</Link>
      </div>
      <FooterPage></FooterPage>
    </main>
  );
};

export default MenuPage;
