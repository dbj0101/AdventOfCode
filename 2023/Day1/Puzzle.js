// let dir = "/Day1";
// let testdata = process.cwd() + dir + "/testdata.txt";
// let data = process.cwd() + dir + "/data.txt";

let data = __dirname + "/testdata.txt";
//data = __dirname + "/data.txt";

let fs = require("fs");
let inStr = fs.readFileSync(data).toString("utf-8");
// console.log(inStr);

let inData = inStr.split("\n");
let numArr = [];
for (item of inData) {
  let arr = [];
  for (let i = 0; i < item.length; i++) {
    if (item[i] >= "0" && item[i] <= "9") {
      arr.push(item[i]);
    }
  }
  numArr.push(Number(arr[0] + arr[arr.length - 1]));
}
let sum = 0;
numArr.forEach((item) => (sum += item));
console.log("sum", sum);
