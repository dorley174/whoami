import '@/css/globals.css';
import HeaderPage from '@/components/header';
import FooterPage from '@/components/footer';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderPage />
      <main>
        <Component {...pageProps} />
      </main>
      <FooterPage />
    </>
  );
}
