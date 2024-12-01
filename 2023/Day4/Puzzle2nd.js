let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

function checkCardApplyWins(card, position) {
  let winningNumbersCount = 0;
  for (num of card.nums) {
    if (card.wins.has(num)) winningNumbersCount += 1;
  }
  for (i = 1; i <= winningNumbersCount; i++) {
    cards[position + i].copies += 1 + card.copies;
  }
}

let sumTotal = 0;
let cards = [];
for (item of inData) {
  //console.log(item);
  let card = {};
  card.copies = 0;
  card.id = item.split(":")[0].replace("Card", "").trim();
  card.wins = new Set();
  item
    .split(":")[1]
    .split("|")[0]
    .trim()
    .split(" ")
    .forEach((val) => {
      if (val !== "") card.wins.add(Number(val));
    });
  card.nums = [];
  item
    .split(":")[1]
    .split("|")[1]
    .trim()
    .split(" ")
    .forEach((val) => {
      if (val !== "") card.nums.push(Number(val));
    });
  cards.push(card);
}

for (const [index, card] of cards.entries()) {
  checkCardApplyWins(card, index);
}
for (card of cards) {
  //console.log(card);
  sumTotal += card.copies + 1;
}
console.log(sumTotal);
