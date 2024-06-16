// lib/useApolloClient.js
import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { useSession } from "@clerk/nextjs";

const useApolloClient = () => {
  const { session } = useSession();

  console.log("Session:", session);

  const httpLink = useMemo(
    () => createHttpLink({ uri: "http://localhost:8080/v1/graphql" }),
    []
  );

  const wsLink = useMemo(() => {
    if (!session) return null;

    const token = session ? session.getToken() : null;
    console.log("WS Token:", token);

    return new GraphQLWsLink(
      createClient({
        url: "ws://localhost:8080/v1/graphql",
        connectionParams: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "X-Hasura-User-Id": "1",
            "x-hasura-role": "user",
            "x-hasura-admin-secret": "myadminsecretkey",
          },
        },
      })
    );
  }, [session]);

  const authLink = useMemo(
    () =>
      setContext(async (_, { headers }) => {
        const token = session ? await session.getToken() : null;
        console.log("HTTP Token:", token);

        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
            "X-Hasura-User-Id": "1",
            "x-hasura-role": "user",
            "x-hasura-admin-secret": "myadminsecretkey",
          },
        };
      }),
    [session]
  );

  const splitLink = useMemo(
    () =>
      split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink || httpLink, // Fallback to httpLink if wsLink is null
        authLink.concat(httpLink)
      ),
    [wsLink, authLink, httpLink]
  );

  const client = useMemo(
    () =>
      new ApolloClient({
        link: ApolloLink.from([splitLink]),
        cache: new InMemoryCache(),
      }),
    [splitLink]
  );

  return client;
};

export default useApolloClient;
