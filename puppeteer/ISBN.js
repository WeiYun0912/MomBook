const puppeteer = require("puppeteer");
const craeteCsvWriter = require("csv-writer").createObjectCsvWriter;

const fs = require("fs");
const axios = require("axios").default;
const csvWriter = craeteCsvWriter({
  // path: "../server/insert/book.csv",
  path: "./book.csv",
  header: [
    { id: "bookName", title: "書名" },
    { id: "author", title: "作者" },
    { id: "publish", title: "出版社" },
    { id: "ISBN", title: "ISBN" },
    { id: "position", title: "位置" },
    { id: "haveImage", title: "是否有圖片網址" },
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
    try {
      await page.goto("http://isbn.ncl.edu.tw/NEW_ISBNNet/");
      await page.select("[name='FO_SearchField0']", "ISBN");
      await page.type("#searchbook", ISBNs[i]);
      await (await page.$("#searchbook")).press("Enter");
      await page.waitForNavigation();
      const bookData = await page.evaluate(async () => {
        const bookName = document
          .querySelector("td[aria-label='書名'] a")
          .textContent.replaceAll(",", ";");
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

      const haveImage = await checkImagePathExists(ISBNs[i]);

      data.push({
        bookName: bookData.bookName,
        author: bookData.author,
        publish: bookData.publish,
        ISBN: ISBNs[i],
        position: "a9",
        haveImage: haveImage,
      });
    } catch (error) {
      console.log("Error happen :", ISBNs[i]);
    }
  }

  csvWriter.writeRecords(data).then(() => console.log("csv down"));

  browser.close();
};

const checkImagePathExists = async (ISBN) => {
  try {
    const response = await axios(
      `https://isbn.ncl.edu.tw/NEW_ISBNNet/main_DisplayResults.php?Pact=ShowFronPage&Pisbn=${ISBN}`
    );

    if (response.status == 200) {
      return "yes";
    }
  } catch (error) {
    return "no";
  }
};

// async () => {

//   console.log(a);
// }()

start();

// 9789577627124
// 9789861616636
// 9789861616650
