let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

const searchArr = ["SSMM", "MSMS", "SMSM", "MMSS"];

let total = 0;

const checkLoc = (inX, inY, inCheckVal) => inData[inY].at(inX) === inCheckVal;

const getLoc = (inX, inY) => inData[inY].at(inX);

const checkXmas = (inX, inY) => {
  const str =
    getLoc(inX - 1, inY - 1) +
    getLoc(inX + 1, inY - 1) +
    getLoc(inX - 1, inY + 1) +
    getLoc(inX + 1, inY + 1);
  //   console.log(
  //     "x:",
  //     inX,
  //     "y:",
  //     inY,
  //     "str:",
  //     str,
  //     "indexOf:",
  //     searchArr.indexOf(str)
  //   );
  ////total = total + searchArr.indexOf(str) >= 0 ? 1 : 0;
  if (searchArr.indexOf(str) >= 0) total++;
  //console.log("total:", total);
};

const checkRow = (inY) => {
  for (let i = 0; i < inData[inY].length; i++) {
    // //if matches first character, search all directions available
    // if (checkLoc(i, inY, searchArr[0])) {
    //   checkDir(i, inY);
    // }
    let currX = i;
    let currY = inY;
    let strToSearch = inData[inY];
    if (
      currX > 0 &&
      currX < strToSearch.length - 1 &&
      currY > 0 &&
      currY < inData.length - 1 &&
      checkLoc(currX, currY, "A")
    ) {
      checkXmas(currX, currY);
    }
  }
};

//console.log(inData);
inData.forEach((val, idx) => checkRow(idx));
console.log(total);
