import React from 'react';
import Link from 'next/link';
import FooterPage from '../components/footer';

const JoinPage: React.FC = () => {
  return (
    <main>
      <Link href="/menu" className="absolute top-8 left-8 z-10">
        <svg
          width="52"
          height="37"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 30L4 16L20 2"
            stroke="#FFC43A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="8"
            y1="16"
            x2="46"
            y2="16"
            stroke="#FFC43A"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </Link>
      <FooterPage></FooterPage>
    </main>
  );
};

export default JoinPage;
