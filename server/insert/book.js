const Author = require("../models/author");
const Publish = require("../models/publish");
const Book = require("../models/book");
const csv = require("csv-parser");

const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const insertBook = new Promise(async (resolve, reject) => {
  fs.createReadStream("./bookA9.csv")
    .pipe(csv())
    .on("data", async (row) => {
      const author = await Author.findOne({ name: row.作者 });
      const publish = await Publish.findOne({ name: row.出版社 });
      let book = new Book({
        name: row.書名,
        authorId: author._id.toString(),
        publishId: publish._id.toString(),
        haveImage: row.是否有圖片網址,
        ISBN: row.ISBN.trim(),
        position: row.位置,
      });

      // console.log(author);
      await book.save();
    })
    .on("end", async () => {
      resolve("end");
    });
});

insertBook.then((d) => {
  console.log(d);
});
