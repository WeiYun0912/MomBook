const puppeteer = require("puppeteer");
const craeteCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csvWriter = craeteCsvWriter({
  path: "../server/insert/book.csv",
  header: [
    { id: "bookName", title: "書名" },
    { id: "author", title: "作者" },
    { id: "publish", title: "出版社" },
    { id: "ISBN", title: "ISBN" },
  ],
});

const start = async () => {
  let data = [];

  const ISBNs = fs.readFileSync("ISBN.txt").toString().split("\r\n");
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  for (let i = 0; i < ISBNs.length; i++) {
    await page.goto("http://isbn.ncl.edu.tw/NEW_ISBNNet/");
    await page.select("[name='FO_SearchField0']", "ISBN");
    await page.type("#searchbook", ISBNs[i]);
    await (await page.$("#searchbook")).press("Enter");
    await page.waitForNavigation();
    const bookData = await page.evaluate(async () => {
      const bookName = document.querySelector(
        "td[aria-label='書名'] a"
      ).textContent;
      const author = document.querySelector(
        "td[aria-label='作者']"
      ).textContent;
      const publish = document.querySelector(
        "td[aria-label='出版者'] font"
      ).textContent;
      return {
        bookName,
        author,
        publish,
      };
    });

    data.push({
      bookName: bookData.bookName,
      author: bookData.author,
      publish: bookData.publish,
      ISBN: ISBNs[i],
    });
  }

  csvWriter.writeRecords(data).then(() => console.log("csv down"));

  browser.close();
};
start();
