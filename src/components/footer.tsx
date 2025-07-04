import React from 'react';
import Link from 'next/link';
import styles from "../css/footer.module.css"

const FooterPage: React.FC = () => {
  return (
    <footer className={styles.footer}>
        <p className={styles.l1}>Found an error? Contact <Link className={styles.l1} href="https://t.me/dorley">us</Link></p>
        <p className={styles.l2}>Innopolis University, Summer 2025</p>
        <p className={styles.l3}>All rights reserved</p>
        <p className={styles.l4}>Who Am I?</p>
        
    </footer>
  );
};

export default FooterPage;
