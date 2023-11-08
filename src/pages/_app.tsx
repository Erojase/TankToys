import Header from '../components/Header'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any
  return (
    <Header>
      <AnyComponent {...pageProps} />
    </Header>
    )
}
