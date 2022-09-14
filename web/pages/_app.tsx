import "../styles/globals.css"
import type { AppProps } from "next/app"
import {
  createClient,
  dedupExchange,
  fetchExchange,
  cacheExchange,
  Provider,
} from "urql"
import { persistedFetchExchange } from "@urql/exchange-persisted-fetch"

const client = createClient({
  url: "http://localhost:1337/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange,
    persistedFetchExchange({
      preferGetForPersistedQueries: true,
    }),
    fetchExchange,
  ],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
