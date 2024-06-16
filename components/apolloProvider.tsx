// lib/ApolloProvider.js
import { ApolloProvider } from "@apollo/client";
// import client from "@/lib/apolloClient.config";
import useApolloClient from "@/lib/useApolloClient";
import { useEffect } from "react";
import { useSession } from "@clerk/nextjs";



type Props = {
    children: React.ReactNode;
    };


const MyApolloProvider = ({ children }: Props) => {
    const client = useApolloClient();
    const { session } = useSession();

    useEffect(() => {

        const fetchToken = async () => {
           
            // const token = await session.getToken();
            // console.log("Token", token);
        }
        fetchToken();

        // get the token from the session
        // const token = session ? session.getToken() : null;


    },[]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default MyApolloProvider;
