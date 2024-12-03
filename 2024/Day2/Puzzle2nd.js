let data = __dirname + "/testdata.txt";
//data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

//inData = [inData[0], inData[1]];

let total = 0;
const calcSafe = inData.map((val) => {
  //console.log("val", val);
  items = val.split(" ");
  //console.log("items:", items);
  if (items.length < 1 || items[0] == items[1]) return 0;
  else if (Number(items[0]) < Number(items[1])) {
    //row is ascending
    //console.log("row is ascending- item.length:", items.length, items);
    for (let i = 0; i < items.length; i++) {
      if (i == items.length - 1) total++;
      else if (
        Number(items[i]) < Number(items[i + 1]) &&
        Math.abs(Number(items[i]) - Number(items[i + 1])) <= 3
      )
        continue;
      else break;
    }
  } else {
    //row is decending
    // console.log("row is decending - item.length:", items.length, items);
    for (let i = 0; i < items.length; i++) {
      //console.log("decending compare i:", i, items[i], items[i + 1]);
      if (i == items.length - 1) total++;
      else if (
        Number(items[i]) > Number(items[i + 1]) &&
        Math.abs(Number(items[i]) - Number(items[i + 1])) <= 3
      ) {
        //console.log();
        continue;
      } else break;
    }
  }
});

console.log("total", total);
