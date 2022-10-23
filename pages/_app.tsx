import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { useAtom } from 'jotai'
import { userAtom } from '../atoms'


const MyApp = ({ Component, pageProps: { session, ...pageProps }, }: AppProps) => {

  const [user, setUser] = useAtom(userAtom)

      useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>

  )
}

export default MyApp

