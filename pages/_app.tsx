import '../css/globals.css';
import HeaderPage from '../src/components/header';
import FooterPage from '../src/components/footer';
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
