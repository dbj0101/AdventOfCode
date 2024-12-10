let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

// const checkCalibration = (cal, oprStr, oprStrPos, success) => {
//   if (success) return success;
//   if (oprStr == null || oprStr == undefined) {
//     oprStr = oprArr[0].repeat(cal.numArr.length-1);
//   }
//   console.log(cal, oprStr);
// };

const checkCalValues = (cal, oprStr) => {
  let total = cal.numArr[0];
  for (let i = 1; i < cal.numArr.length; i++) {
    if (oprStr[i - 1] == "+") {
      //console.log("calc+", total, "+", cal.numArr[i]);
      total = total + cal.numArr[i];
    } else if (oprStr[i - 1] == "*") {
      //console.log("calc*", total, "*", cal.numArr[i]);
      total = total * cal.numArr[i];
    }
  }
  return total == cal.result;
};
const checkCalibration = (cal, oprStr, success) => {
  if (success) return success;
  if (oprStr == null || oprStr == undefined) {
    oprStr = "";
  }
  if (oprStr.length == cal.numArr.length - 1) {
    //console.log("Add oprStr to array:", oprStr);
    //check for success
    return checkCalValues(cal, oprStr);
  } else
    for (let i = 0; i < oprArr.length; i++) {
      let newOprStr = oprStr + oprArr[i];
      //console.log("Check newOprStr:", newOprStr);
      if (checkCalibration(cal, newOprStr, success)) {
        success = true;
        return success;
      }
    }
  return false;
};

const oprArr = ["+", "*"];
const calArr = [];
inData.forEach((val) => {
  const tempArr = val.split(": ");
  let obj = {};
  obj.result = Number(tempArr[0]);
  obj.numArr = tempArr[1].split(" ").map((val) => Number(val));
  //console.log(obj);
  calArr.push(obj);
});

// let testObj = { result: 190, numArr: [10, 19] };
// console.log("checkCalibration(testObj)", checkCalibration(testObj, ""));
// console.log(checkCalValues(testObj, "**"));

let total = 0;
//console.log("calArr", calArr);
calArr.forEach((val) => {
  if (checkCalibration(val)) {
    //console.log("Calibration Success:", val);
    total = total + val.result;
  }
});
console.log("total", total);
