import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FooterPage from '../components/footer';

const CreatePage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    });
    const data = await res.json();
    setCode(data.code);
  };

  const handleJoin = () => {
    router.push(`/rooms/${code}`);
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
      <button onClick={handleCreate}>Generate Room Code</button>
      {code && (
        <>
          <p>Room Code: {code}</p>
          <button onClick={handleJoin}>Join Room</button>
        </>
      )}
      <FooterPage></FooterPage>
    </main>
  );
};

export default CreatePage;
