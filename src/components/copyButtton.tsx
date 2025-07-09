import React, { useState } from 'react';
import styles from '@/css/copybutton.module.css';

interface CopyButtonProps {
  copy: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ copy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(copy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        alert('Error due coping code');
      });
  };

  return (
    <div>
      <button className={styles.copybutton} onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy code'}
      </button>
    </div>
  );
};

export default CopyButton;
