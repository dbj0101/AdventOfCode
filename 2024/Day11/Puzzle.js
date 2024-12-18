let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split(" ").map((val) => Number(val));
console.log(inData);

let totalBlinks = 35;
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
// let s = "123456";
// console.log(s.substring(0, s.length / 2));
// console.log(s.substring(s.length / 2, s.length));
