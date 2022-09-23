import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Box, Container } from "@material-ui/core";
import Actions from "./components/Actions";
import Book from "./components/Book";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://mombook.herokuapp.com/graphql",
    // uri: "http://localhost:4000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <Container maxWidth="xl">
        <Box style={{ marginTop: "3em" }}>
          <Box>
            <Actions />
          </Box>
          <Box>
            <Book />
          </Box>
        </Box>
      </Container>
    </ApolloProvider>
  );
}

export default App;
