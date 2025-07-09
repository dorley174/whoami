// pages/404.js
import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div style={{ margin: '150px 0', textAlign: 'center', padding: '50px', color: '#8e0000' }}>
      <h1>404</h1>
      <h2>Error: we could not find page that you search.</h2>
      <p>
        Check the URL address correctness or return to the{' '}
        <Link style={{ textDecoration: 'none', color: '#8e0000', fontWeight: '600' }} href="/#">
          main page
        </Link>
        .
      </p>
    </div>
  );
};

export default Custom404;
