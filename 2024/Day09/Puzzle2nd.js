let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

// // let inData = inStr.split("\n");
// console.log(inStr);

const swapArr = (iPos, jPos, arr, len) => {
  for (let k = 0; k < len; k++) {
    let te = arr.splice(jPos + k, 1);
    let tb = arr.splice(iPos + k, 1);
    arr.splice(iPos + k, 0, te[0]);
    arr.splice(jPos + k, 0, tb[0]);
  }
};

let idNum = 0;
let sArr = [];
let idNumArr = [];
for (let i = 0; i < inStr.length; i++) {
  if (i % 2 > 0) for (let j = 0; j < Number(inStr[i]); j++) sArr.push(".");
  else {
    idNumArr.push(Number(inStr[i]));
    if (Number(inStr[i]) <= 0) console.log("Zero length file:", idNum);
    for (let j = 0; j < Number(inStr[i]); j++) sArr.push(String(idNum));
    idNum++;
  }
}

//console.log(idNumArr);
//console.log(sArr.join(""));

for (idNum = idNumArr.length - 1; idNum > -1; idNum--) {
  //idNum > -1
  //console.log(idNum, idNumArr[idNum], sArr.indexOf(String(idNum)));
  let minIdx = sArr.indexOf(String(idNum));
  let fLen = idNumArr[idNum];
  let i = 0;
  let endNum = sArr.indexOf(String(idNum));
  while (i < endNum) {
    if (sArr[i] != ".") i++;
    else {
      //check number of spaces if longEnough
      let longEnough = true;
      let j = i;
      for (j = i + 1; j < i + fLen; j++)
        if (sArr[j] != ".") {
          longEnough = false;
          break;
        }
      if (longEnough) {
        //console.log("LONG ENOUGH", i, minIdx, fLen);
        ////swap positions(send i, minIdx, fLen)
        swapArr(i, minIdx, sArr, fLen);
        i = endNum;
      } else {
        //console.log("Is not long enogh, next", i, minIdx, fLen);
        //// i = i + fLen;
        i = j;
      }
    }
  }
}

let checkSum = 0;
for (i = 0; i < sArr.length; i++)
  if (sArr[i] != ".") checkSum = checkSum + i * Number(sArr[i]);

//console.log(sArr);
//console.log(sArr.join(""));
//console.log(idNumArr);
console.log("checkSum", checkSum);

//6390641140916 is too high
