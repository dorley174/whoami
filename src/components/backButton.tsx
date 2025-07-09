import React from 'react';
import Link from 'next/link';
import styles from '@/css/buttons.module.css';

const BackButton: React.FC = () => {
  return (
    <Link className={styles.backbutton} href="/rooms">
      ◄ Back to rooms
    </Link>
  );
};

export default BackButton;
