import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";


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
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
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

- Routes replaces Switch in latest v of react-router-dom.

*/
