import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script';
import Head from 'next/head';
import MAP_API_KEY from "mapAPI_KEY.json"
import "@/styles/LeaveReview.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Next Naver maps</title>
      </Head>
      <Script
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${MAP_API_KEY.NEXT_PUBLIC_MAP_KEY}`}
      ></Script>

      <Component {...pageProps} />
    </>
  );
};
