import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Gateway Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* @ts-ignore: Unreachable code error */}
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
