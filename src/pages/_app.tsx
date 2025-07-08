import '../css/globals.css';
import HeaderPage from '../components/header';
import FooterPage from '../components/footer';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderPage />
      <main>
        <Component {...pageProps} />
      </main>
      <FooterPage />
    </>
  );
}
