import '../styles/globals.css'
import { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from "react-query"

const queryClient = new QueryClient

function MyApp({ Component, pageProps: { ...pageProps }, }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
