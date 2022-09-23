import { gql } from "@apollo/client";

export const QUERY_BOOKS = gql`
  query Books {
    books {
      ... on BooksSuccessResult {
        books {
          id
          name
          authorAndPublish {
            authorName
            publishName
          }
        }
      }
    }
  }
`;
