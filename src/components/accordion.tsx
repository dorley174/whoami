import { useRef, useState } from 'react';
import styles from '@/css/accordion.module.css';

type FAQItemProps = {
  question: string;
  answer: string;
};

export default function Accordion({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.accordion}>
      <a onClick={() => setOpen(!open)} className={styles.nonopen}>
        <span className={styles.open}>{open ? '︽' : '︾'}</span>
        <p className={styles.question}>{question}</p>
      </a>

      <div
        ref={contentRef}
        className={`${styles.answerwrapper} ${open ? styles.opened : styles.closed}`}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
      >
        <div className={styles.answer}>{answer}</div>
      </div>
    </div>
  );
}
