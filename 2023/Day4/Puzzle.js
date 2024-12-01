let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

function checkCard(card) {
  //console.log(card);
  let retVal = 0;
  for (num of card.nums) {
    if (card.wins.has(num)) retVal = retVal > 0 ? retVal * 2 : 1;
  }
  return retVal;
}

let sumTotal = 0;
for (item of inData) {
  console.log(item);
  let card = {};
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
  sumTotal += checkCard(card);
}
console.log(sumTotal);
