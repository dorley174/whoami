import Link from 'next/link';
import FooterPage from '../components/footer';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const JoinPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleJoin = async () => {
    const res = await fetch('/api/rooms/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, nickname }),
    });

    if (res.ok) {
      router.push(`/rooms/${code.toUpperCase()}`);
    } else {
      alert('Room not found or expired');
    }
  };

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
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
      />
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Room Code" />
      <button onClick={handleJoin}>Join Room</button>
      <FooterPage></FooterPage>
    </main>
  );
};

export default JoinPage;
