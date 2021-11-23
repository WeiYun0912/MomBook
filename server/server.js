const { ApolloServer } = require("apollo-server");
const resolvers = require("./schema/resolvers");
const { Query } = require("./schema/resolvers/Query");
const { Mutation } = require("./schema/resolvers/Mutation");
const { Author } = require("./schema/resolvers/Author");
const { Book } = require("./schema/resolvers/Book");
const { Publish } = require("./schema/resolvers/Publish");
const { BooksResult } = require("./schema/resolvers/BooksResult");

const typeDefs = require("./schema/type");
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mogoose connect!!!");
});

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Author,
    Book,
    Publish,
    BooksResult,
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is ${url}`);
});
