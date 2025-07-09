import React from 'react';
import Link from 'next/link';

const BackButton: React.FC = () => {
  return (
    <Link
      style={{
        marginLeft: '30px',
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content',
        textAlign: 'center',
        padding: '10px 50px',
        fontSize: '1.3rem',
        fontWeight: '600',
        color: '#8e0000',
        backgroundColor: '#ffe29e',
        border: '3px solid #8e0000',
        borderRadius: '20px',
        textDecoration: 'none',
      }}
      href="/rooms"
      className="absolute top-8 left-8 z-10"
    >
      ◄ Back to rooms
    </Link>
  );
};

export default BackButton;
