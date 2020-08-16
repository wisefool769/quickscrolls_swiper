
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'https://tomorrowviral-db-api.herokuapp.com/v1/graphql',
})

export default new ApolloClient({
  cache,
  link,
})
