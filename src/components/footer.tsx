import React from 'react';
import Link from 'next/link';
import styles from '../css/footer.module.css';

const FooterPage: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.l1}>
        Found an error?{' '}
        <Link className={styles.l11} href="https://t.me/dorley">
          Contact me!
        </Link>
      </p>
      <p className={styles.l2}>Innopolis University, Summer 2025</p>
      <p className={styles.l3}>All rights reserved</p>
      <p className={styles.l4}>
        {' '}
        <Link className={styles.l11} href="https://github.com/dorley174/whoami">
          Who Am I?
        </Link>{' '}
      </p>
    </footer>
  );
};

export default FooterPage;
