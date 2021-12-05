import { ApolloClient, InMemoryCache } from '@apollo/client';

export const service = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
});
