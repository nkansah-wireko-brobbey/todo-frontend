"use client"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { useSession } from "@clerk/nextjs";


// const {getToken} = useAuth();

const httpLink = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

const token = "";
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8080/v1/graphql",
    connectionParams: async () => {
      // const token = await getToken({ template: "hasura" });
      // const session = useSession();
      // const token = session ? session.session : null;

      console.log("Token: ", token);

      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "X-Hasura-User-Id": "1",
          "x-hasura-role": "user",
          "x-hasura-admin-secret": "myadminsecretkey",
        },
      };
    },
  })
);

// const authLink = setContext(async (_, {headers})=>{
//   nst token = await getToken({template: "hasura"});
//   return {
//     headers:{
//       ...headers,
//      authorization: token ? `Bearer ${token}` : ''
//     }
//   }
// })
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-Hasura-User-Id": "1",
      "x-hasura-role": "user",
      authorization: token ? `Bearer ${token}` : "",
      "x-hasura-admin-secret": "myadminsecretkey",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: ApolloLink.from([splitLink]),
  cache: new InMemoryCache(),
});

export default client;
