const { ApolloServer } = require("apollo-server");
const resolvers = require("./schema/resolvers");
const typeDefs = require("./schema/type");
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`${url} running`);
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mogoose connect!!!");
});
