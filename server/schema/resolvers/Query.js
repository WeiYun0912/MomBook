const Book = require("../../models/book");
const Author = require("../../models/author");
const Publish = require("../../models/publish");

exports.Query = {
  books: async (_, { filter }) => {
    let Books;
    if (filter?.name) {
      Books = await Book.find({ name: { $regex: filter.name } });
      return { books: Books };
    }
    Books = await Book.find({});
    if (Books) return { books: Books };

    return { message: "Error happen!!!" };
  },

  authors: async (_, { filter }) => {
    if (filter?.name)
      return await Author.find({ name: { $regex: filter.name } });

    return await Author.find({});
  },

  publishs: async (_, { filter }) => {
    if (filter?.name)
      return await Publish.find({ name: { $regex: filter.name } });

    return await Publish.find({});
  },

  book: async (parent, args) => {
    return await Book.find({ name: { $regex: args.name } });
  },
  author: async (parent, args) => {
    return await Author.find({ name: { $regex: args.name } });
  },

  publish: async (parent, args) => {
    return await Publish.find({ name: { $regex: args.name } });
  },
};
