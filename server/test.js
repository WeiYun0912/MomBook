const Author = require("./models/author");
const Publish = require("./models/publish");
const Book = require("./models/book");

const csv = require("csv-parser");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let authorData = [];
let publishData = [];
let bookData = [];

const insertAuthor = () => {
  fs.createReadStream("file.csv")
    .pipe(csv())
    .on("data", (row) => {
      authorData.push({
        name: row.作者,
      });
    })
    .on("end", async () => {
      await Author.insertMany(authorData);
    });
};

const insertPublish = () => {
  fs.createReadStream("file.csv")
    .pipe(csv())
    .on("data", (row) => {
      publishData.push({
        name: row.作者,
      });
    })
    .on("end", async () => {
      await Publish.insertMany(publishData);
    });
};

// 書名找id 出版社找id

const insertBook = () => {
  fs.createReadStream("file.csv")
    .pipe(csv())
    .on("data", async (row) => {
      console.log(row.出版社);
      const author = await Author.findOne({ name: row.作者 });
      const publish = await Publish.findOne({ name: row.出版社 });
      console.log(author._id.toString());
      //   bookData.push({
      //     name: row.書名,
      //     authorId,
      //     publishId,
      //   });
    })
    .on("end", async () => {
      //   console.log(bookData);
      //   await Publish.insertMany(publishData);
      //   console.log("publ;ish insert...");
    });
};

return new Promise(function (resolve, reject) {
  insertBook();
  //   resolve("Success insert Author and Publisg");
}).then((d) => {
  //   setTimeout(() => {
  //     insertBook();
  //   }, 5000);
});
