let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");

function checkToAddAdjacent(gearindex, rowindex) {
  //keep track of adjacent numbers
  let adjNum = [];
  //check row above
  if (itemNumMap.has(rowindex - 1)) {
    for (item of itemNumMap.get(rowindex - 1)) {
      if (gearindex <= item.maxIndex + 1 && gearindex >= item.minIndex - 1) {
        console.log(
          "Adjacent on row ABOVE:",
          item.strVal,
          `(row - ${rowindex + 1} and gearindex - ${gearindex}))`
        );

        //console.log(item.strVal);
        adjNum.push(Math.abs(Number(item.strVal)));
      }
    }
  }
  //check current row
  for (item of itemNumMap.get(rowindex)) {
    if (gearindex + 1 === item.minIndex || gearindex - 1 === item.maxIndex) {
      console.log(
        "Adjacent on SAME row:",
        item.strVal,
        `(row - ${rowindex + 1} and gearindex - ${gearindex}))`
      );

      // console.log(item.strVal);
      adjNum.push(Math.abs(Number(item.strVal)));
    }
  }
  //check next row
  if (itemNumMap.has(rowindex + 1)) {
    for (item of itemNumMap.get(rowindex + 1)) {
      if (gearindex <= item.maxIndex + 1 && gearindex >= item.minIndex - 1) {
        console.log(
          "Adjacent on row BELOW:",
          item.strVal,
          `(row - ${rowindex + 1} and gearindex - ${gearindex})`
        );

        // console.log(item.strVal);
        adjNum.push(Math.abs(Number(item.strVal)));
      }
    }
  }
  console.log(
    `ADJACENT NUMBERS of ROW - ${rowindex + 1} and GEARINDEX - ${gearindex}))`,
    adjNum
  );
  if (adjNum.length == 2) return adjNum[0] * adjNum[1];
  else return 0;
}

const symIndex = new Map();
const itemNumMap = new Map();

for ([rowindex, item] of inData.entries()) {
  //console.log(rowindex, item);
  const itemNumArr = [];
  let symArr = [];
  let itemNum = null;
  for (let i = 0; i < item.length; i++) {
    if (item[i] === ".") {
      if (itemNum !== null) itemNumArr.push(itemNum);
      itemNum = null;
      continue;
    }
    if (item[i] === "*") {
      symArr.push(i);
      if (itemNum !== null) itemNumArr.push(itemNum);
      itemNum = null;
    } else if (item[i].match(/\d/g)) {
      if (itemNum == null)
        itemNum = { strVal: "", minIndex: i, rowindex: rowindex };
      itemNum["strVal"] += item[i];
      itemNum["maxIndex"] = i;
    }
  }
  //last push if number still exists
  if (itemNum !== null) itemNumArr.push(itemNum);
  itemNum = null;
  itemNumMap.set(rowindex, itemNumArr);
  if (symArr.length > 0) symIndex.set(rowindex, symArr);
}

console.log(symIndex);
console.log("");
console.log(itemNumMap);

let sumTotal = 0;
for (rowIndex of symIndex.keys()) {
  for (gearIndex of symIndex.get(rowIndex))
    sumTotal += checkToAddAdjacent(gearIndex, rowIndex);
}
console.log("sumTotal:", sumTotal);
