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

const insertAuthor = new Promise((resolve, reject) => {
  fs.createReadStream("./book.csv")
    .pipe(csv())
    .on("data", (row) => {
      authorData.push({
        name: row.作者,
      });
    })
    .on("end", async () => {
      await Author.insertMany(authorData);
      resolve("success");
    });
});
const insertPublish = new Promise((resolve, reject) => {
  fs.createReadStream("./book.csv")
    .pipe(csv())
    .on("data", (row) => {
      publishData.push({
        name: row.出版社,
      });
    })
    .on("end", async () => {
      await Publish.insertMany(publishData);
      resolve("success");
    });
});

Promise.all([insertAuthor, insertPublish]).then(async (d) => {
  if (d[0] && d[1] === "success") {
    console.log("down!");
    process.exit(1);
  }
});
