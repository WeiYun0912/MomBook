const Author = require("../models/author");
const Publish = require("../models/publish");
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

const insertAuthor = new Promise(async (resolve, reject) => {
  fs.createReadStream("./book.csv")
    .pipe(csv())
    .on("data", async (row) => {
      authorData.push({
        name: row.作者,
      });
    })
    .on("end", async (d) => {
      resolve(authorData);
    });
});

const insertPublish = new Promise((resolve, reject) => {
  fs.createReadStream("./book.csv")
    .pipe(csv())
    .on("data", async (row) => {
      publishData.push({
        name: row.出版社,
      });
    })
    .on("end", async () => {
      resolve(publishData);
    });
});

insertAuthor.then((d) => {
  let newAuthor = [...new Map(d.map((item) => [item["name"], item])).values()];
  newAuthor.map(async (author) => {
    if ((await Author.findOne({ name: author.name })) == null) {
      let a = new Author({
        name: author.name,
      });
      await a.save();
    }
  });
});

insertPublish.then((d) => {
  let newPublish = [...new Map(d.map((item) => [item["name"], item])).values()];
  newPublish.map(async (publish) => {
    if ((await Publish.findOne({ name: publish.name })) == null) {
      let a = new Publish({
        name: publish.name,
      });
      await a.save();
    }
  });
});

// insertPublish.then((d) => console.log("dd", d));

// Promise.all([insertAuthor, insertPublish]).then(async (d) => {
//   if (d[0] && d[1] === "success") {
//     console.log("down!");
//     process.exit(1);
//   }
// });
