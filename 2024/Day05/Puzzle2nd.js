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

//populate validArr
printArr.forEach((val, idx) => {
  const printArr = val.split(",").map((val) => Number(val));
  let validPrint = true;
  rulesArr.forEach((val) => {
    const ruleArr = val.split("|").map((val) => Number(val));
    if (!checkRule(ruleArr, printArr)) validPrint = false;
  });
  if (!validPrint) validArr.push(printArr);
});

// validArr.splice(1, 2);
// console.log(validArr);

// let tempVal = validArr[0].splice(1, 1);
// console.log("tempVal:", tempVal, "validArr[0]:", validArr[0]);
// validArr[0].splice(0, 0, tempVal[0]);
// console.log("tempVal:", tempVal, "validArr[0]:", validArr[0]);

validArr.forEach((printArr, idx) => {
  //const printArr = val.split(",").map((val) => Number(val));
  let keepLooping = true;
  while (keepLooping) {
    let validPrint = true;
    rulesArr.forEach((val) => {
      const ruleArr = val.split("|").map((val) => Number(val));
      if (!checkRule(ruleArr, printArr)) {
        validPrint = false;
        //console.log("ruleArr:", ruleArr, "printArr:", printArr);
        let tempArr = printArr.splice(printArr.indexOf(ruleArr[0]), 1);
        printArr.splice(printArr.indexOf(ruleArr[1]), 0, tempArr[0]);
        //console.log("ruleArr:", ruleArr, "printArr:", printArr);
      }
    });
    if (validPrint) keepLooping = false;
    //keepLooping = false;
  }
});

//console.log("validArr", validArr);
let total = 0;
validArr.forEach((val) => (total = total + val.at((val.length - 1) / 2)));
console.log(total);
