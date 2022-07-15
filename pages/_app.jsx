import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { SessionProvider } from "next-auth/react"

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps },}) {
  return (
    <SessionProvider session={session}>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    </SessionProvider>
      
  )
}

export default MyApp
