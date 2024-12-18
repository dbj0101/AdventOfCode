let data = __dirname + "/testdata.txt";
//data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split(" ").map((val) => Number(val));
//console.log(inData);

//console.log(arrArr);

let totalBlinks = 55;
let total = 0;
const applyRules = (val, blinkLevel) => {
  //console.log("val:", val, "blinkLevel:", blinkLevel, "total", total);
  if (blinkLevel >= totalBlinks) return;
  else if (val == 0) {
    applyRules(1, blinkLevel + 1);
  } else if (String(val).length % 2 == 0) {
    let s = String(val);
    // console.log(s.substring(0, s.length / 2));
    // console.log(s.substring(s.length / 2, s.length));
    total++;
    applyRules(Number(s.substring(0, s.length / 2)), blinkLevel + 1);
    applyRules(Number(s.substring(s.length / 2, s.length)), blinkLevel + 1);
  } else applyRules(val * 2024, blinkLevel + 1);
};
inData.forEach((val) => {
  total++;
  applyRules(val, 0);
  console.log("Number Ran", val, "total", total);
});

//125 @ 55 Blinks: 5,349,632,837 and about 10 min
console.log("total", total);
//TEST 30: 445,882
//30: 1795128
//    1795128

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let arr2 = arr.splice(0, arr.length / 2);

// console.log(arr2, arr);
