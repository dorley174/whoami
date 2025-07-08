import BackButton from '@/components/backButton';
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
      <BackButton></BackButton>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
      />
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Room Code" />
      <button onClick={handleJoin}>Join Room</button>
    </main>
  );
};

export default JoinPage;
