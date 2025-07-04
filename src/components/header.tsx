import React from 'react';
import Link from 'next/link';
import styles from "../css/header.module.css"

const HeaderPage: React.FC = () => {
  return (
    <header>
      <nav className={styles.headernav}>
        <Link className={styles.link} href="/">Who Am I?</Link>
        <Link className={styles.link} href="/menu">Menu</Link>
        <Link className={styles.link} href="/rules">Rules</Link>
        <Link className={styles.link} href="/about">About</Link>
        
      </nav>
    </header>
  );
};

export default HeaderPage;
