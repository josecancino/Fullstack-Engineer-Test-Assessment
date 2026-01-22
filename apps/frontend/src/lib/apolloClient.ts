import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client';

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
        }),
        cache: new InMemoryCache(),
    });
}
