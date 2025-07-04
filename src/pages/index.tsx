import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <main>
      <h1>Добро пожаловать в игру Who Am I</h1>
      <p>Это главная страница.</p>
      <Link href="/rules">
        Правила игры
      </Link>
    </main>
  );
};

export default HomePage;
