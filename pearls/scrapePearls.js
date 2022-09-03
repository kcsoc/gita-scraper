const fs = require("fs");
const bg = require("../data/bg.json");
const pearls = [];

const CHAPTER_2_PEARLS = [
  "13",
  "14",
  "15",
  "16",
  "17",
  "20",
  "22",
  "23",
  "24",
  "25",
  "27",
  "30",
  "40",
  "42-43",
  "44",
  "45",
  "47",
  "48",
  "49",
  "50",
  "51",
  "55",
  "56",
  "57",
  "58",
  "59",
  "61",
  "62",
  "63",
  "65",
  "66",
  "67",
  "68",
  "70",
  "71",
];

CHAPTER_2_PEARLS.forEach((verseNumber) =>
  pearls.push(
    bg.find(({ chapter, verse }) => chapter == 2 && verse == verseNumber)
  )
);

fs.writeFileSync("./pearls/pearls.json", JSON.stringify(pearls));
