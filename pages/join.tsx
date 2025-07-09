import BackButton from '@/components/backButton';
import styles from '@/css/createjoin.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const JoinPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJoin = async () => {
    setError('');

    if (!nickname) {
      setError('Please enter your nickname');
      return;
    } else if (!code) {
      setError('Please enter invite code to enter the room');
      return;
    } else if (!nickname || !code) {
      setError('Please enter both nickname and room code');
      return;
    }
    const res = await fetch('/api/rooms/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Failed to join the room');
      return;
    }

    // room join
    router.push(`/rooms/${code}`);
  };

  return (
    <>
      <BackButton></BackButton>
      <div className={styles.wrapper}>
        <div className={styles.createmenu}>
          <h1 style={{ color: '#8e0000' }}>Join room</h1>

          <input
            className={styles.nicknameinput}
            type="text"
            placeholder="Your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            className={styles.nicknameinput}
            type="text"
            placeholder="Invite code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={6}
          />
          <button className={styles.buttoncreate} onClick={handleJoin}>
            Join
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default JoinPage;
