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

  input FilterInput {
    name: String
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

  type AuthorAndPublish {
    authorName: String
    publishName: String
  }

  type Book {
    id: ID!
    name: String!
    publishId: String!
    authorId: String!
    author: [Author!]
    publish: [Publish!]
    authorAndPublish: AuthorAndPublish
  }

  type Query {
    authors(filter: FilterInput): [Author!]!
    author(name: String!): [Author!]
    books(filter: FilterInput): BooksResult
    book(name: String!): [Book!]
    publishs(filter: FilterInput): [Publish!]
    publish(name: String!): [Publish!]
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author
    createBook(input: BookInput!): Book
    createPublish(input: String!): Publish
    updateBook(input: String!): Book
  }

  type BooksSuccessResult {
    books: [Book!]
  }

  type BooksErrorResult {
    message: String!
  }

  union BooksResult = BooksSuccessResult | BooksErrorResult
`;

module.exports = type;
