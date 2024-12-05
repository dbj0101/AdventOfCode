let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

const list1 = [],
  list2 = [];
inData.forEach((val) => {
  arr = val.split("   ");
  list1.push(arr[0]);
  list2.push(arr[1]);
});
list1.sort();
list2.sort();
// console.log("list1", list1);
// console.log("list2", list2);
let total = 0;
list1.forEach((val) => {
  total = total + val * list2.filter((fVal) => fVal === val).length;
});
console.log(total);
