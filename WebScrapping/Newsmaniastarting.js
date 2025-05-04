import fs from "fs";
import { Cluster } from "puppeteer-cluster";
const urls = [
  "https://www.news18.com/india/",
  "https://www.hindustantimes.com/",
  "https://www.news18.com/world/",
  "https://www.asianage.com",
  "https://www.news18.com/tech/",
  "https://www.news18.com/business/markets/",
  "https://www.asianage.com/sports",
  "https://indianexpress.com/section/sports/",
  "https://www.asianage.com/technology",
  "https://scroll.in/",
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

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);

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
    } else if (url.includes("https://www.asianage.com/technology")) {
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
    } else if (url.includes("https://indianexpress.com/section/sports/")) {
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

        fs.appendFile(
          "sports.csv",
          `${title.replace(/,/g, " ")},${gotourl} , ${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    } else if (url.includes("https://www.asianage.com")) {
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
    } else if (url.includes("https://scroll.in")) {
      await page.goto("https://scroll.in/", {
        waitUntil: "domcontentloaded",
      });

      // Select all article cards in the Scroll.in Home section
      const productHandles = await page.$$(
        "#feed > div:nth-child(4) > div.row-stories.column.scroll-box.scroll-box-3 > ul > li"
      );

      for (const product of productHandles) {
        let title = "NULL";
        let gotourl = "NULL";
        let image = "NULL";

        try {
          title = await page.evaluate(
            (el) =>
              el.querySelector("a > div > h1")?.textContent.trim() || "NULL",
            product
          );
        } catch (error) {
          console.error("Title error:", error);
        }

        try {
          let href = await page.evaluate(
            (el) => el.querySelector("a")?.getAttribute("href") || "NULL",
            product
          );
          gotourl = href.startsWith("http") ? href : `https://scroll.in${href}`;
        } catch (error) {
          console.error("URL error:", error);
        }

        try {
          image = await page.evaluate(
            (el) =>
              el.querySelector("a > figure > img")?.getAttribute("src") ||
              "NULL",
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
    } else if (url.includes("https://www.news18.com/business/markets/")) {
      await page.goto("https://www.news18.com/business/markets/", {
        waitUntil: "domcontentloaded",
      });

      const productHandles = await page.$$(
        "#__next > section > main > section > div.jsx-1976791735.cn-left > ul > li"
      );

      console.log(`Found ${productHandles.length} articles`);

      for (const product of productHandles) {
        let title = "NULL";
        let gotourl = "NULL";
        let image = "NULL";

        try {
          title = await page.evaluate(
            (el) =>
              el.querySelector("a > figcaption")?.textContent.trim() || "NULL",
            product
          );
        } catch (error) {
          console.error("Title error:", error);
        }

        try {
          gotourl = await page.evaluate(
            (el) => el.querySelector("a")?.href || "NULL",
            product
          );
        } catch (error) {
          console.error("URL error:", error);
        }

        try {
          image = await page.evaluate(
            (el) =>
              el.querySelector("a > figure > img")?.getAttribute("src") ||
              "NULL",
            product
          );
        } catch (error) {
          console.error("Image error:", error);
        }

        // Write to business.csv
        fs.appendFile(
          "business.csv",
          `${title.replace(/,/g, " ")},${gotourl},${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    } else if (url.includes("https://www.news18.com/tech/")) {
      await page.goto("https://www.news18.com/tech/", {
        waitUntil: "domcontentloaded",
      });

      const productHandles = await page.$$(
        "#__next > section > main > section > div.jsx-1976791735.cn-left > ul > li"
      );

      for (const product of productHandles) {
        let title = "NULL";
        let gotourl = "NULL";
        let image = "NULL";

        try {
          title = await page.evaluate(
            (el) =>
              el.querySelector("a > figcaption")?.textContent.trim() || "NULL",
            product
          );
        } catch (error) {
          console.error("Title error:", error);
        }

        try {
          let href = await page.evaluate(
            (el) => el.querySelector("a")?.getAttribute("href") || "NULL",
            product
          );
          gotourl = href.startsWith("http")
            ? href
            : `https://www.news18.com${href}`;
        } catch (error) {
          console.error("URL error:", error);
        }

        try {
          image = await page.evaluate(
            (el) =>
              el.querySelector("a > figure > img")?.getAttribute("src") ||
              "NULL",
            product
          );
        } catch (error) {
          console.error("Image error:", error);
        }

        // Write to CSV
        fs.appendFile(
          "tech.csv",
          `${title.replace(/,/g, " ")},${gotourl},${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    } else if (url.includes("https://www.news18.com/world/")) {
      await page.goto("https://www.news18.com/world/", {
        waitUntil: "domcontentloaded",
      });

      const productHandles = await page.$$(
        "#__next > section > main > section > div.jsx-1976791735.cn-left > ul > li"
      );

      for (const product of productHandles) {
        let title = "NULL";
        let gotourl = "NULL";
        let image = "NULL";

        try {
          title = await page.evaluate(
            (el) =>
              el.querySelector("a > figcaption")?.textContent.trim() || "NULL",
            product
          );
        } catch (error) {
          console.error("Title error:", error);
        }

        try {
          let href = await page.evaluate(
            (el) => el.querySelector("a")?.getAttribute("href") || "NULL",
            product
          );
          gotourl = href.startsWith("http")
            ? href
            : `https://www.news18.com${href}`;
        } catch (error) {
          console.error("URL error:", error);
        }

        try {
          image = await page.evaluate(
            (el) =>
              el.querySelector("a > figure > img")?.getAttribute("src") ||
              "NULL",
            product
          );
        } catch (error) {
          console.error("Image error:", error);
        }

        // Write to CSV
        fs.appendFile(
          "world.csv",
          `${title.replace(/,/g, " ")},${gotourl},${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    }

    // new
    else if (url.includes("https://www.news18.com/india/")) {
      await page.goto("https://www.news18.com/india/", {
        waitUntil: "domcontentloaded",
      });

      // Select all news article cards under the wrapper
      const productHandles = await page.$$(
        "#__next > section > main > section > div.jsx-1976791735.cn-left > ul > li"
      );

      for (const product of productHandles) {
        let title = "NULL";
        let gotourl = "NULL";
        let image = "NULL";

        try {
          title = await page.evaluate(
            (el) =>
              el.querySelector("a > figcaption")?.textContent.trim() || "NULL",
            product
          );
        } catch (error) {
          console.error("Title error:", error);
        }

        try {
          let href = await page.evaluate(
            (el) => el.querySelector("a")?.getAttribute("href") || "NULL",
            product
          );
          gotourl = href.startsWith("http")
            ? href
            : `https://www.news18.com${href}`;
        } catch (error) {
          console.error("URL error:", error);
        }

        try {
          image = await page.evaluate(
            (el) =>
              el.querySelector("a > figure > img")?.getAttribute("src") ||
              "NULL",
            product
          );
        } catch (error) {
          console.error("Image error:", error);
        }

        // Write to home.csv
        fs.appendFile(
          "home.csv",
          `${title.replace(/,/g, " ")},${gotourl},${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    }

    //before this
  });
  for (const url of urls) {
    await cluster.queue(url);
  }

  // Close cluster when done
  await cluster.idle();
  await cluster.close();
})();
