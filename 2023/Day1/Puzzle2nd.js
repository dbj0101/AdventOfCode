let data = __dirname + "/testdata2nd.txt";
data = __dirname + "/data.txt";

let fs = require("fs");
let inStr = fs.readFileSync(data).toString("utf-8");
// console.log(inStr);

let inData = inStr.split("\n");
let searchArr = [
  { searchVal: "one", resultVal: "1" },
  { searchVal: "two", resultVal: "2" },
  { searchVal: "three", resultVal: "3" },
  { searchVal: "four", resultVal: "4" },
  { searchVal: "five", resultVal: "5" },
  { searchVal: "six", resultVal: "6" },
  { searchVal: "seven", resultVal: "7" },
  { searchVal: "eight", resultVal: "8" },
  { searchVal: "nine", resultVal: "9" },
];
let numArr = [];
for (item of inData) {
  //console.log("item", item);
  let arr = [];
  for (let i = 0; i < item.length; i++) {
    if (item[i] >= "0" && item[i] <= "9") {
      arr.push(item[i]);
    } else
      for (si of searchArr) {
        if (item.indexOf(si.searchVal, i) === i) {
          arr.push(si.resultVal);
          break;
        }
      }
  }
  //console.log("arr", arr);
  numArr.push(Number(arr[0] + arr[arr.length - 1]));
  //console.log("numArr", numArr);
}
let sum = 0;
numArr.forEach((item) => (sum += item));
console.log("sum", sum);

function findAll(stringToSearch, searchValue) {
  // Declare variables
  let pos = 0;
  let num = -1;
  let retArr = [];
  let i = -1;
  //let graf = "This is a test";

  // Search the string and counts the number of searchValue
  while (pos != -1) {
    pos = stringToSearch.indexOf(searchValue, i + 1);
    num += 1;
    if (pos > 0) retArr.push(pos);
    i = pos;
    pos = pos + 1 >= searchValue.length ? -1 : pos;
  }
  return retArr;
}
