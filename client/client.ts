import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    const hasAuthError = graphQLErrors.some(
      (error) => error.message === 'Unauthorized',
    )

    if (hasAuthError) {
      localStorage?.clear()
      client.resetStore()
      window?.location.replace('/auth/login')
    }
  }
}) as unknown as ApolloLink

export const client = new ApolloClient({
  ssrMode: false,
  link: ApolloLink.from([
    errorLink,
    new HttpLink({
      uri: `/api/graphql`,
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
})
