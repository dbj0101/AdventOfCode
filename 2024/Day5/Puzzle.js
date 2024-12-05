let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
// console.log(inData);

const rulesArr = [];
const printArr = [];
const validArr = [];

inData.forEach((val) => {
  if (val.indexOf("|") > 0) rulesArr.push(val);
  else if (val !== "") printArr.push(val);
});

const checkRule = (ruleArr, printArr) => {
  if (printArr.indexOf(ruleArr[0]) == -1 || printArr.indexOf(ruleArr[1]) == -1)
    return true;
  if (printArr.indexOf(ruleArr[0]) < printArr.indexOf(ruleArr[1])) return true;
  //   console.log("false rule:", ruleArr, printArr);
  //   console.log(printArr.indexOf(ruleArr[0]), printArr.indexOf(ruleArr[1]));
  return false;
};

// printArr.splice(1, 5);
// //console.log(printArr);

//populate validArr
printArr.forEach((val, idx) => {
  const printArr = val.split(",").map((val) => Number(val));
  let validPrint = true;
  rulesArr.forEach((val) => {
    const ruleArr = val.split("|").map((val) => Number(val));
    if (!checkRule(ruleArr, printArr)) validPrint = false;
  });
  if (validPrint) validArr.push(printArr);
});

// console.log("validArr:", validArr);
let total = 0;
validArr.forEach((val) => (total = total + val.at((val.length - 1) / 2)));
console.log(total);
