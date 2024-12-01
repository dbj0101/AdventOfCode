let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");

function checkToAddAdjacent(item) {
  //check row above
  if (symIndex.has(item.rowindex - 1)) {
    for (idx of symIndex.get(item.rowindex - 1)) {
      if (idx <= item.maxIndex + 1 && idx >= item.minIndex - 1) {
        console.log(
          "Adjacent on row ABOVE:",
          item.strVal,
          `(row - ${item.rowindex + 1})`
        );

        //console.log(item.strVal);
        return Math.abs(Number(item.strVal));
      }
    }
  }
  //check current row
  for (idx of symIndex.get(item.rowindex)) {
    if (idx + 1 === item.minIndex || idx - 1 === item.maxIndex) {
      console.log(
        "Adjacent on SAME row:",
        item.strVal,
        `(row - ${item.rowindex + 1})`
      );

      // console.log(item.strVal);
      return Math.abs(Number(item.strVal));
    }
  }
  //check next row
  if (symIndex.has(item.rowindex + 1)) {
    for (idx of symIndex.get(item.rowindex + 1)) {
      if (idx <= item.maxIndex + 1 && idx >= item.minIndex - 1) {
        console.log(
          "Adjacent on row BELOW:",
          item.strVal,
          `(row - ${item.rowindex + 1})`
        );

        // console.log(item.strVal);
        return Math.abs(Number(item.strVal));
      }
    }
  }
  console.log("DO NOT INCLUDE:", item.strVal, `(row - ${item.rowindex + 1})`);
  return 0;
}

const itemNums = [];
const symIndex = new Map();
const allChars = new Set();
const allSyms = new Set();

for ([rowindex, item] of inData.entries()) {
  //console.log(rowindex, item);
  let symArr = [];
  let itemNum = null;
  for (let i = 0; i < item.length; i++) {
    allChars.add(item[i]);
    if (item[i] === ".") {
      if (itemNum !== null) itemNums.push(itemNum);
      itemNum = null;
      continue;
    }
    if (item[i].match(/\W/g)) {
      symArr.push(i);
      allSyms.add(item[i]);
      if (itemNum !== null) itemNums.push(itemNum);
      itemNum = null;
    } else if (item[i].match(/\d/g)) {
      if (itemNum == null)
        itemNum = { strVal: "", minIndex: i, rowindex: rowindex };
      itemNum["strVal"] += item[i];
      itemNum["maxIndex"] = i;
    }
  }
  //last push if number still exists
  if (itemNum !== null) itemNums.push(itemNum);
  itemNum = null;
  symIndex.set(rowindex, symArr);
}

// console.log(symIndex);
// console.log("");
// console.log(itemNums);

let sumTotal = 0;
for (item of itemNums) {
  sumTotal += checkToAddAdjacent(item);
}
console.log("sumTotal:", sumTotal);
// console.log("allChars:", allChars);
// console.log("allSyms:", allSyms);
