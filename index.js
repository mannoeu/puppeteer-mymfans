const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://mym.fans/mathildtantot");

  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll(".portfolio-item > a > img");
    const imgArray = [...nodeList];

    const imgList = imgArray.map(({ src }) => ({
      src,
    }));

    return imgList;
  });

  fs.writeFile("api.json", JSON.stringify(imgList, null, 2), (err) => {
    if (err) throw new Error("Something went wrong");

    console.log("well done!");
  });

  /* await browser.close(); */
})();
