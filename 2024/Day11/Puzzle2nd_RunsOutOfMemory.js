let data = __dirname + "/testdata.txt";
//data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split(" ").map((val) => Number(val));
//console.log(inData);

let limit = 1000000;
let arrArr = [inData];
//console.log(arrArr);

let totalBlinks = 6;
for (let iBlink = 0; iBlink < totalBlinks; iBlink++) {
  let newArrArr = [];
  arrArr.forEach((arr, idx) => {
    let newArr = [];
    arr.forEach((val, idx) => {
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
    if (newArr.length >= limit) {
      newArrArr.push(newArr.splice(0, newArr.length / 2));
    }
    newArrArr.push(newArr);
  });
  arrArr = newArrArr;
}

let total = 0;
arrArr.forEach((arr) => (total = total + arr.length));
console.log(total, arrArr.length);
//TEST 30: 445,882
//30: 1795128
//    1795128

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let arr2 = arr.splice(0, arr.length / 2);

// console.log(arr2, arr);
