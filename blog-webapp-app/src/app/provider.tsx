// app/providers.tsx

'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});

export default function Providers({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
