import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Container } from "@material-ui/core";
import Book from "./components/Book";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="xl">
        <Book />
      </Container>
    </ApolloProvider>
  );
}

export default App;
