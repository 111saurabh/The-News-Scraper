import puppeteer from "puppeteer";
import fs from "fs";
// const fs = require("fs");
// const { Cluster } = require("puppeteer-cluster");
import { Cluster } from "puppeteer-cluster";
const urls = [
  "https://www.asianage.com",
  "https://www.hindustantimes.com/",

  "https://www.asianage.com/business",

  "https://indianexpress.com/section/business/",
  "https://www.asianage.com/sports",
  "https://indianexpress.com/section/sports/",
  "https://www.asianage.com/technology",
  "https://indianexpress.com/section/technology/",
  "https://www.hindustantimes.com/real-estate",

  "https://www.asianage.com/world",
  "https://indianexpress.com/section/political-pulse/",
];

// Clear existing CSV files
const csvFiles = [
  "home.csv",
  "business.csv",
  "sports.csv",
  "tech.csv",
  "world.csv",
];
csvFiles.forEach((file) => {
  fs.writeFileSync(file, "title,url,image\n"); // Add headers
});

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 1,
    // monitor: true,
    puppeteerOptions: {
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    },
  });
  cluster.on("taskerror", (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });
  // let data = [];
  // let buffer = fs.readFileSync("./result.json");
  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    // await page.waitForNavigation({ waitUntil: "networkidle2" });

    // asian age sports

    if (url.includes("https://www.asianage.com/sports")) {
      const baseURL = "https://www.asianage.com";

      // Wait for at least one card to appear
      await page.waitForSelector(
        "#content > div.container-scroller > div > div.container > div.col-sm-12 > div.listing-wrapper > div:nth-child(2) > div > div"
      );

      // Run inside browser context to get all card data
      const cards = await page.evaluate(() => {
        const baseURL = "https://www.asianage.com";
        const cardNodes = document.querySelectorAll(
          "#content > div.container-scroller > div > div.container > div.col-sm-12 > div.listing-wrapper > div:nth-child(2) > div > div"
        );

        const data = [];
        cardNodes.forEach((el) => {
          const title =
            el.querySelector("h5 > a")?.textContent.trim() || "NULL";
          let gotourl =
            el.querySelector("h5 > a")?.getAttribute("href") || "NULL";
          if (gotourl !== "NULL" && !gotourl.startsWith("http")) {
            gotourl = baseURL + gotourl;
          }
          const image =
            el.querySelector("a > img")?.getAttribute("data-src") || "NULL";
          data.push({ title, gotourl, image });
        });
        return data;
      });

      console.log(`Found ${cards.length} cards`);

      for (const { title, gotourl, image } of cards) {
        console.log(`Scraped: ${title}, ${gotourl}, ${image}`);
        fs.appendFile(
          "sports.csv",
          `${title.replace(/,/g, " ")},${gotourl},${image}\n`,
          (err) => {
            if (err) throw err;
          }
        );
      }
    } 
    
    
    
    else if (url.includes("https://www.asianage.com/technology")) {
        const baseURL = "https://www.asianage.com";
      
        // Wait for the cards to load
        await page.waitForSelector(
          "#content > div.container-scroller > div > div.container > div.col-sm-12 > div.listing-wrapper > div:nth-child(2) > div > div"
        );
      
        // Extract all cards in page context
        const cards = await page.evaluate(() => {
          const baseURL = "https://www.asianage.com";
          const cardNodes = document.querySelectorAll(
            "#content > div.container-scroller > div > div.container > div.col-sm-12 > div.listing-wrapper > div:nth-child(2) > div > div"
          );
      
          const data = [];
          cardNodes.forEach((el) => {
            const title = el.querySelector("h5 > a")?.textContent.trim() || "NULL";
            let gotourl = el.querySelector("h5 > a")?.getAttribute("href") || "NULL";
            if (gotourl !== "NULL" && !gotourl.startsWith("http")) {
              gotourl = baseURL + gotourl;
            }
            const image = el.querySelector("a > img")?.getAttribute("data-src") || "NULL";
            data.push({ title, gotourl, image });
          });
      
          return data;
        });
      
        console.log(`Found ${cards.length} technology cards`);
      
        // Write to CSV
        for (const { title, gotourl, image } of cards) {
          console.log(`Scraped: ${title}, ${gotourl}, ${image}`);
          fs.appendFile(
            "tech.csv",
            `${title.replace(/,/g, " ")},${gotourl},${image}\n`,
            (err) => {
              if (err) throw err;
            }
          );
        }
      }
      
      
      
    //not scraping below code
    
    
    // else if (url.includes("https://www.asianage.com/world")) {
    //   // Task for URLs containing 'page=1'
    //   var temp = "https://www.asianage.com";
    //   const productHandles = await page.$$(".sixnews>div");
    //   for (const product of productHandles) {
    //     let title = "NULL";
    //     let image = "NULL";
    //     let gotourl = "NULL";
    //     try {
    //       title = await page.evaluate(
    //         (el) => el.querySelector("h3>a").textContent,
    //         product
    //       );
    //     } catch (error) {
    //       console.error(error);
    //     }
    //     try {
    //       gotourl = await page.evaluate(
    //         (el) => el.querySelector("a").getAttribute("href"),
    //         product
    //       );
    //     } catch (error) {
    //       console.error(error);
    //     }
    //     try {
    //       image = await page.evaluate(
    //         (el) => el.querySelector("a>img").getAttribute("data-src"),
    //         product
    //       );
    //     } catch (error) {
    //       console.error(error);
    //     }

    //     // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
    //     fs.appendFile(
    //       "world.csv",
    //       `${title.replace(/,/g, " ")},${temp + gotourl} , ${image}\n`,
    //       function (err) {
    //         if (err) throw err;
    //       }
    //     );
    //   }
    // }


    else if (url.includes("https://indianexpress.com/section/business/")) {
      // Task for URLs containing 'page=1'
      const productHandles = await page.$$(".leftpanel>.nation>.articles");
      for (const product of productHandles) {
        let title = "NULL";
        let image = "NULL";
        let gotourl = "NULL";
        try {
          title = await page.evaluate(
            (el) => el.querySelector("div:nth-child(2)>p").textContent,
            product
          );
        } catch (error) {
          console.error(error);
        }
        try {
          gotourl = await page.evaluate(
            (el) => el.querySelector("div:nth-child(1)>a").getAttribute("href"),
            product
          );
        } catch (error) {
          console.error(error);
        }
        try {
          image = await page.evaluate(
            (el) =>
              el.querySelector("div:nth-child(1)>a>img").getAttribute("src"),
            product
          );
        } catch (error) {
          console.error(error);
        }

        // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
        fs.appendFile(
          "business.csv",
          `${title.replace(/,/g, " ")},${gotourl} , ${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    }

    // indian express ka politics ka world me dal diye  hain
    else if (
      url.includes("https://indianexpress.com/section/political-pulse/")
    ) {
      // Task for URLs containing 'page=1'
      const productHandles = await page.$$(
        ".archive.tax-ie_section.term-political-pulse.term-635437367.ie_country_IN>#wrapper>#section>.container>div>.leftpanel>.nation>.articles"
      );
      for (const product of productHandles) {
        let title = "NULL";
        let image = "NULL";
        let gotourl = "NULL";
        try {
          title = await page.evaluate(
            (el) =>
              el.querySelector(".articles>div:nth-child(2)>h2>a").textContent,
            product
          );
        } catch (error) {
          console.error(error);
        }
        try {
          gotourl = await page.evaluate(
            (el) =>
              el
                .querySelector(".articles>div:nth-child(1)>a")
                .getAttribute("href"),
            product
          );
        } catch (error) {
          console.error(error);
        }
        try {
          image = await page.evaluate(
            (el) =>
              el
                .querySelector(".articles>div:nth-child(1)>a>img")
                .getAttribute("src"),
            product
          );
        } catch (error) {
          console.error(error);
        }

        // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
        fs.appendFile(
          "world.csv",
          `${title.replace(/,/g, " ")},${gotourl} , ${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    } else if (url.includes("https://indianexpress.com/section/technology/")) {
      // Task for URLs containing 'page=1'
      const productHandles = await page.$$(".top-article>ul>li");
      for (const product of productHandles) {
        let title = "NULL";
        let image = "NULL";
        let gotourl = "NULL";
        try {
          title = await page.evaluate(
            (el) => el.querySelector("h3").textContent,
            product
          );
        } catch (error) {
          console.error(error);
        }
        try {
          gotourl = await page.evaluate(
            (el) => el.querySelector("h3>a").getAttribute("href"),
            product
          );
        } catch (error) {
          console.error(error);
        }
        try {
          image = await page.evaluate(
            (el) => el.querySelector("figure>a>img").getAttribute("src"),
            product
          );
        } catch (error) {
          console.error(error);
        }

        // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
        fs.appendFile(
          "tech.csv",
          `${title.replace(/,/g, " ")},${gotourl} , ${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    } else if (url.includes("https://indianexpress.com/section/sports/")) {
      // Task for URLs containing 'page=1'
      const productHandles = await page.$$(".leftpanel>.nation>.articles");
      for (const product of productHandles) {
        let title = "NULL";
        let image = "NULL";
        let gotourl = "NULL";
        try {
          title = await page.evaluate(
            (el) => el.querySelector("div:nth-child(2)>p").textContent,
            product
          );
        } catch (error) {
          console.error(error);
        }
        try {
          gotourl = await page.evaluate(
            (el) => el.querySelector("div:nth-child(1)>a").getAttribute("href"),
            product
          );
        } catch (error) {
          console.error(error);
        }
        try {
          image = await page.evaluate(
            (el) =>
              el.querySelector("div:nth-child(1)>a>img").getAttribute("src"),
            product
          );
        } catch (error) {
          console.error(error);
        }

        // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
        fs.appendFile(
          "sports.csv",
          `${title.replace(/,/g, " ")},${gotourl} , ${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    } 
    
    
    //not scraping below code
    // else if (url.includes("https://www.asianage.com/business")) {
    //   // Task for URLs containing 'page=1'
    //   const productHandles = await page.$$(".sixnews>div");
    //   for (const product of productHandles) {
    //     let title = "NULL";
    //     let image = "NULL";
    //     let gotourl = "NULL";
    //     try {
    //       title = await page.evaluate(
    //         (el) => el.querySelector("h3>a").textContent,
    //         product
    //       );
    //     } catch (error) {
    //       console.error(error);
    //     }
    //     try {
    //       gotourl = await page.evaluate(
    //         (el) => el.querySelector("a").getAttribute("href"),
    //         product
    //       );
    //     } catch (error) {
    //       console.error(error);
    //     }
    //     try {
    //       image = await page.evaluate(
    //         (el) => el.querySelector("a>img").getAttribute("data-src"),
    //         product
    //       );
    //     } catch (error) {
    //       console.error(error);
    //     }

    //     // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
    //     fs.appendFile(
    //       "business.csv",
    //       `${title.replace(/,/g, " ")},${url + gotourl} , ${image}\n`,
    //       function (err) {
    //         if (err) throw err;
    //       }
    //     );
    //   }
    // }

    // modifications for home page
    else if (url.includes("asianage")) {
      await page.goto("https://www.asianage.com/", {
        waitUntil: "domcontentloaded",
      });

      // Select all news article cards under Home
      const productHandles = await page.$$(
        "#home_top_level_1 > div > div > div"
      );

      for (const product of productHandles) {
        let title = "NULL";
        let gotourl = "NULL";
        let image = "NULL";

        try {
          title = await page.evaluate(
            (el) => el.querySelector("h5 > a")?.textContent.trim() || "NULL",
            product
          );
        } catch (error) {
          console.error("Title error:", error);
        }

        try {
          let href = await page.evaluate(
            (el) => el.querySelector("h5 > a")?.getAttribute("href") || "NULL",
            product
          );
          gotourl = href.startsWith("http")
            ? href
            : `https://www.asianage.com${href}`;
        } catch (error) {
          console.error("URL error:", error);
        }

        try {
          image = await page.evaluate(
            (el) =>
              el.querySelector("div > a > img")?.getAttribute("src") || "NULL",
            product
          );
        } catch (error) {
          console.error("Image error:", error);
        }

        // Write to CSV
        fs.appendFile(
          "home.csv",
          `${title.replace(/,/g, " ")},${gotourl},${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    }

    
  });
  for (const url of urls) {
    await cluster.queue(url);
  }

  // Close cluster when done
  await cluster.idle();
  await cluster.close();
})();
