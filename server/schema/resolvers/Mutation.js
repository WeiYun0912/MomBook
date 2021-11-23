const Book = require("../../models/book");
const Author = require("../../models/author");
const Publish = require("../../models/publish");

exports.Mutation = {
  createAuthor: (parent, args) => {
    let author = new Author({
      name: args.input.name,
    });
    return author.save();
  },
  createBook: (parent, args) => {
    let book = new Book({
      name: args.input.name,
      publishId: args.input.publishId,
      authorId: args.input.authorId,
    });
    return book.save();
  },

  createPublish: (parent, args) => {
    let publish = new Publish({
      name: args.input,
    });
    return publish.save();
  },

  updateBook: async (parent, args) => {
    await Book.updateOne(
      { name: args.input },
      { $set: { publish: "6191de684c9eef964dd8fb13" } }
    );
    return await Book.findOne({ name: args.input });
  },
};
