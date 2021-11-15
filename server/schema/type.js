const { gql } = require("apollo-server");

const type = gql`
  input CreateAuthorInput {
    name: String!
    totalBook: Int
  }

  input BookInput {
    name: String!
    publishId: String!
    authorId: String!
  }

  type Publish {
    id: ID!
    name: String!
    books: [Book!]
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Book {
    id: ID!
    name: String!
    publishId: String!
    authorId: String!
    author: [Author!]
    publish: [Publish!]
  }

  type Query {
    authors: [Author!]!
    author(name: String!): [Author!]
    books: [Book!]
    book(name: String!): [Book!]
    publishs: [Publish!]
    publish(name: String!): [Publish!]
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author
    createBook(input: BookInput!): Book
    createPublish(input: String!): Publish
    updateBook(input: String!): Book
  }
`;

module.exports = type;
