import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';

import Layout from '../components/Layout';

// Lens Communication
const API_URL = 'https://api.lens.dev';
const apolloClient = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function LensApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider attribute='class'>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </WagmiConfig>
  )
}

export default LensApp;