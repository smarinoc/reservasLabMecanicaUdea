import 'styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import Layout from 'layout/Layout';
import Auth from '@components/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUploadLink } from 'apollo-upload-client';
import Head from 'next/head';

const link = createUploadLink({
  uri: 'http://localhost:3000/api/graphql',
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Head>
          <title>{pageProps.name}</title>
        </Head>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Layout>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
