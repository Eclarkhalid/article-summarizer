import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '../services/store'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <Header />
      <main className={`max-sm:px-4 ${inter.className}`}>
        <Component {...pageProps} />
      </main>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Provider>
  </>
}
