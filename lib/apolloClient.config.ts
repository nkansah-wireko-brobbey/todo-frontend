import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
})

const authLink = setContext((_, {headers})=>{
  return {
    headers:{
      ...headers,
      'X-Hasura-User-Id':1,
      'x-hasura-role':'user'
    }
  }
})


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export default client;