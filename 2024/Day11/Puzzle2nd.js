let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split(" ").map((val) => Number(val));
console.log(inData);

let totalBlinks = 32;
for (let iBlink = 0; iBlink < totalBlinks; iBlink++) {
  let newArr = [];
  inData.forEach((val, idx) => {
    if (val == 0) {
      newArr.push(1);
    } else if (String(val).length % 2 == 0) {
      let s = String(val);
      // console.log(s.substring(0, s.length / 2));
      // console.log(s.substring(s.length / 2, s.length));
      newArr.push(Number(s.substring(0, s.length / 2)));
      newArr.push(Number(s.substring(s.length / 2, s.length)));
    } else newArr.push(val * 2024);
  });
  inData = newArr;
  //console.log(inData);
}

console.log(inData.length);

totalBlinks = 43;
let total = 0;
let count = 0;
let countMap = new Map();
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
    count++;
    applyRules(Number(s.substring(0, s.length / 2)), blinkLevel + 1);
    applyRules(Number(s.substring(s.length / 2, s.length)), blinkLevel + 1);
  } else applyRules(val * 2024, blinkLevel + 1);
};
inData.forEach((val) => {
  total++;
  count = 0;

  if (countMap.has(val)) {
    count = countMap.get(val);
    total = total + count;
  } else {
    applyRules(val, 0);
    countMap.set(val, count);
  }

  console.log(
    "Number Ran",
    val,
    "total",
    total,
    "count",
    count,
    "total-count",
    total - count
  );
});

//125 @ 55 Blinks: 5,349,632,837 and about 10 min
console.log("total", total);

// let s = "123456";
// console.log(s.substring(0, s.length / 2));
// console.log(s.substring(s.length / 2, s.length));
