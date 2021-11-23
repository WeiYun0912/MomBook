import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Container } from "@material-ui/core";
import Book from "./components/Book";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://mombook.herokuapp.com/graphql",
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
