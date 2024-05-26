import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
 })

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:8080/v1/graphql',
}));

const authLink = setContext((_, {headers})=>{
  return {
    headers:{
      ...headers,
      'X-Hasura-User-Id':'1',
      'x-hasura-role':'user'
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);


const client = new ApolloClient({
    link: ApolloLink.from([splitLink]),
    cache: new InMemoryCache(),
  });

export default client;