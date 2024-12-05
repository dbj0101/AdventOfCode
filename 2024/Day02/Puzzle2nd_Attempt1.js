let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

let total = 0;
const calcSafe = inData.map((val) => {
  //console.log("val", val);
  items = val.split(" ");
  //console.log("items:", items);
  let skipCount = 0;
  let skipItem = false;
  let isAscending = false;
  let isDecending = false;
  if (items.length <= 1) return 0;
  if (items[0] < items[1]) isAscending = true;
  if (items[0] > items[1]) isDecending = true;
  if (items[0] == items[1] && items.length > 2)
    if (items[0] < items[2]) isAscending = true;
    else if (items[0] > items[2]) isDecending = true;
  if (isAscending) {
    //row is ascending
    //console.log("row is ascending- item.length:", items.length, items);
    for (let i = 0; i < items.length; i++) {
      if (skipCount > 1) break;
      else if (skipItem) {
        skipItem = false;
        continue;
      } else if (i == items.length - 1) {
        total++;
        //console.log("successful row", items);
      } else if (
        Number(items[i]) < Number(items[i + 1]) &&
        Math.abs(Number(items[i]) - Number(items[i + 1])) <= 3
      )
        continue;
      else if (
        i < items.length - 2 &&
        Number(items[i]) < Number(items[i + 2]) &&
        Math.abs(Number(items[i]) - Number(items[i + 2])) <= 3
      ) {
        skipCount++;
        skipItem = true;
        continue;
      } else break;
    }
  } else if (isDecending) {
    //row is decending
    // console.log("row is decending - item.length:", items.length, items);
    for (let i = 0; i < items.length; i++) {
      //console.log("decending compare i:", i, items[i], items[i + 1]);
      if (skipCount > 1) break;
      else if (skipItem) {
        skipItem = false;
        continue;
      } else if (i == items.length - 1) {
        total++;
        //console.log("successful row", items);
      } else if (
        Number(items[i]) > Number(items[i + 1]) &&
        Math.abs(Number(items[i]) - Number(items[i + 1])) <= 3
      )
        continue;
      else if (
        i < items.length - 2 &&
        Number(items[i]) > Number(items[i + 2]) &&
        Math.abs(Number(items[i]) - Number(items[i + 2])) <= 3
      ) {
        skipCount++;
        skipItem = true;
        continue;
      } else break;
    }
  }
});

console.log("total", total);
