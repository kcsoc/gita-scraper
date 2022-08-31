const puppeteer = require("puppeteer");
const fs = require("fs");

const bg = [];

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let chapter = 12; chapter <= 18; chapter++) {
    let verse = 1;

    while (verse) {
      await page.goto(`https://vedabase.io/en/library/bg/${chapter}/${verse}/`);
      const sanskrit = await page.evaluate(
        () => document.querySelector(".r-verse-text")?.innerText
      );
      let translation = await page.evaluate(
        () => document.querySelector(".r-translation")?.innerText
      );

      if (sanskrit && translation) {
        console.log("Chapter ", chapter, " ,verse ", verse);
        bg.push({
          chapter,
          verse,
          sanskrit,
          translation,
        });
        verse++;
        fs.writeFileSync("data/bg.json", JSON.stringify(bg));
      } else {
        let multiVerse = false;
        for (let i = 1; i < 5; i++) {
          await page.goto(
            `https://vedabase.io/en/library/bg/${chapter}/${verse}-${
              verse + i
            }/`
          );
          const sanskrit = await page.evaluate(
            () => document.querySelector(".r-verse-text")?.innerText
          );
          let translation = await page.evaluate(
            () => document.querySelector(".r-translation")?.innerText
          );

          if (sanskrit && translation) {
            console.log("Chapter ", chapter, " ,verse ", verse, "-", verse + i);
            bg.push({
              chapter,
              verse: `${verse}-${verse + i}`,
              sanskrit,
              translation,
            });
            multiVerse = i;
            verse++;
            fs.writeFileSync("data/bg.json", JSON.stringify(bg));
          }
        }

        if (multiVerse) {
          verse += multiVerse;
        } else {
          verse = null;
        }
      }
    }
  }

  await browser.close();
};

main().catch((e) => console.error(e));
