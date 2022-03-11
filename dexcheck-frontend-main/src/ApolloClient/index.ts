import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { RestLink } from 'apollo-link-rest';

// HTTP Link
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/api',
  // uri:
  //   process.env.REACT_GRAPH_URL ||
  //   'https://ec2-18-206-140-250.compute-1.amazonaws.com:3001/api',
});

// Adds Authentication Headers on HTTP as well as was requests
const authLink = setContext((_, { headers }) => {
  // const token = getToken();
  return {
    headers: {
      ...headers,
      // authorization: token,
    },
  };
});

// WebSocket Link
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/api`,
  // uri:
  //   process.env.REACT_WS_GRAPH_URL ||
  //   'wss://ec2-18-206-140-250.compute-1.amazonaws.com:3001/api',
  options: {
    reconnect: true,
    lazy: true,
  },
});

// Send query request based on the type definition
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

// Apollo Client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
