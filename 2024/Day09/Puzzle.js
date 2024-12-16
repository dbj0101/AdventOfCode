let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

// // let inData = inStr.split("\n");
// console.log(inStr);

const swapArr = (iPos, jPos, arr) => {
  let te = arr.splice(jPos, 1);
  let tb = arr.splice(iPos, 1);
  arr.splice(iPos, 0, te[0]);
  arr.splice(jPos, 0, tb[0]);
};

let idNum = 0;
let sArr = [];
for (let i = 0; i < inStr.length; i++) {
  if (i % 2 > 0) for (let j = 0; j < Number(inStr[i]); j++) sArr.push(".");
  else {
    for (let j = 0; j < Number(inStr[i]); j++) sArr.push(String(idNum));
    idNum++;
  }
}

let i = 0;
let j = sArr.length - 1;
while (i < j) {
  if (sArr[i] != ".") i++;
  else if (sArr[j] == ".") j--;
  else swapArr(i, j, sArr);
}

let checkSum = 0;
for (i = 0; i < sArr.length; i++)
  if (sArr[i] != ".") checkSum = checkSum + i * Number(sArr[i]);

// console.log(sArr);
// console.log(sArr.join(""));
console.log("checkSum", checkSum);
