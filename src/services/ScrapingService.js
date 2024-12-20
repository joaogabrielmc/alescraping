import puppeteer from "puppeteer";


export default class ScrapingService {
  static async getInfo() {
    const data = [];

    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();

    for (let indice = 1; indice <= 99; indice++) {

      await page.goto(`https://www.drogalider.com.br/farmacia/medicamentos/?sort=a-z&map=c%2Cc&p=${indice}`, {
        waitUntil: "networkidle2",
      });

      await page.waitForSelector(
        "#main-wrapper > div > div.container.mb-4 > div.row > div.col-12.col-lg-9.pl-lg-0 > div > div.list-products.page-content"
      );

      const lines = await page.evaluate(() => {
        return document.querySelector(
          "#main-wrapper > div > div.container.mb-4 > div.row > div.col-12.col-lg-9.pl-lg-0 > div > div.list-products.page-content"
        ).childElementCount;
      });

      for (let i = 1; i <= lines; i++) {
        const returnData = await page.evaluate((i) => {
          let name = "";
          let description = "";
          let price = "";

          try {
            name = document.querySelector(
              `#main-wrapper > div > div.container.mb-4 > div.row > div.col-12.col-lg-9.pl-lg-0 > div > div.list-products.page-content > div:nth-child(${i}) > div > div > div > p`
            ).innerText;
          } catch (error) { }
          try {
            description = document.querySelector(
              `#main-wrapper > div > div.container.mb-4 > div.row > div.col-12.col-lg-9.pl-lg-0 > div > div.list-products.page-content > div:nth-child(${i}) > div > div > div > h2`
            ).innerText;
          } catch (error) { }
          try {
            price = document.querySelector(
              `#main-wrapper > div > div.container.mb-4 > div.row > div.col-12.col-lg-9.pl-lg-0 > div > div.list-products.page-content > div:nth-child(${i}) > div > div > div > div > div > div > p`
            ).innerText;
          } catch (error) { }

          return { name, description, price };
        }, i);

        data.push(returnData);
      }

    }
    return data
  }
}
