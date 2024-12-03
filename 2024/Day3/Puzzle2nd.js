let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

const mult = (str) => {
  if (str == "don't()" || str == "do()") return 0;
  let nums = str.replace("mul(", "").replace(")", "");
  const numArr = nums.split(",").map((val) => Number(val));
  return numArr[0] * numArr[1];
};

const removeDisabled = (arr) => {
  const idxDont = arr.indexOf("don't()", 0);
  if (idxDont === -1) return arr;
  let idxDo = arr.indexOf("do()", idxDont);
  if (idxDo === -1) idxDo = arr.length - idxDont;
  else idxDo = idxDo - idxDont + 1;
  console.log("idxDont:", idxDont, "idxDo:", idxDo);
  console.log(arr.splice(idxDont, idxDo));
  console.log(arr);

  //arr.splice(idxDont, idxDo);
  //return arr;
};

const mulArr = inStr.match(/(mul\(\d{1,3}\,\d{1,3}\)|don\'t\(\)|do\(\))/g);

console.log(mulArr);
while (mulArr.indexOf("don't()") > -1) removeDisabled(mulArr);

console.log(mulArr);
let total = 0;
mulArr.forEach((val) => {
  total = total + mult(val);
});

console.log("total:", total);
