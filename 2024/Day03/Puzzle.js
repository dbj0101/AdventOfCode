let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

const mult = (str) => {
  let nums = str.replace("mul(", "").replace(")", "");
  const numArr = nums.split(",").map((val) => Number(val));
  return numArr[0] * numArr[1];
};

const mulArr = inStr.match(/mul\(\d{1,3}\,\d{1,3}\)/g);
let total = 0;
mulArr.forEach((val) => {
  total = total + mult(val);
});

console.log("total:", total);
