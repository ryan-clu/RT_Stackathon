import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Clients from "./components/Clients";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;

/*
NOTES

- ApolloClient - is bolted on top of our React front end. ApolloClient is what communicates with our GraphQL API.
- ApolloProvider - wrapper around our app so that all components and routes of our app will have access to GraphQL.
- InMemoryCache - don't have to refresh page to see updates.

*/
