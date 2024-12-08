let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

// String.prototype.replaceAt = function (index, replacement) {
//   return (
//     this.substring(0, index) +
//     replacement +
//     this.substring(index + replacement.length)
//   );
// };

const replaceStringChar = (index, replacement, str) => {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};

const dirArr = ["^", ">", "v", "<"];
const lookArr = [
  { dir: "^", look: [0, -1] },
  { dir: ">", look: [1, 0] },
  { dir: "v", look: [0, 1] },
  { dir: "<", look: [-1, 0] },
];
const currLocDir = {
  locX: 0,
  locY: 0,
  dir: "^",
  dirIndex: 0,
};
const defaultLocDir = {
  locX: 0,
  locY: 0,
  dir: "^",
  dirIndex: 0,
};

const setDefaultLocDir = (x, y, dir) => {
  defaultLocDir.locX = x;
  defaultLocDir.locY = y;
  defaultLocDir.dir = dir;
  defaultLocDir.dirIndex = dirArr.indexOf(dir);
};
const resetCurrLocDir = () => {
  currLocDir.locX = defaultLocDir.locX;
  currLocDir.locY = defaultLocDir.locY;
  currLocDir.dir = defaultLocDir.dir;
  currLocDir.dirIndex = dirArr.indexOf(defaultLocDir.dir);
};

const setLocDir = (x, y, dir) => {
  currLocDir.locX = x;
  currLocDir.locY = y;
  currLocDir.dir = dir;
  currLocDir.dirIndex = dirArr.indexOf(dir);
};
const getLookToTurnRight = (mapArr) => {
  //const dir = lookArr[dirArr.indexOf(currLocDir.dir)];
  //console.log("currLocDir", currLocDir, "look dir", dir);
  let newX = currLocDir.locX + lookArr[currLocDir.dirIndex].look[0];
  let newY = currLocDir.locY + lookArr[currLocDir.dirIndex].look[1];
  if (
    newY < 0 ||
    newY >= mapArr.length ||
    newX < 0 ||
    newX >= mapArr[newY].length
  )
    return false;
  return mapArr[newY].at(newX) == "#";
};
const getLocItem = (x, y, mapArr) => mapArr[y].at(x);
const moveCheckIfExited = (mapArr) => {
  let newX = currLocDir.locX + lookArr[currLocDir.dirIndex].look[0];
  let newY = currLocDir.locY + lookArr[currLocDir.dirIndex].look[1];
  //   mapArr[currLocDir.locY] = replaceStringChar(
  //     currLocDir.locX,
  //     "X",
  //     mapArr[currLocDir.locY]
  //   );
  currLocDir.locX = newX;
  currLocDir.locY = newY;
  if (
    newY < 0 ||
    newY >= mapArr.length ||
    newX < 0 ||
    newX >= mapArr[newY].length
  )
    return true;
  return false;
};
const turnRight = () => {
  currLocDir.dirIndex++;
  if (currLocDir.dirIndex >= dirArr.length) currLocDir.dirIndex = 0;
  currLocDir.dir = dirArr[currLocDir.dirIndex];
};
const checkIfLooping = (usedBlocLocArr) => {
  let valX = currLocDir.locX;
  let valY = currLocDir.locY;
  let valDir = currLocDir.dirIndex;
  //   //return if already exists within array
  for (let i = 0; i < usedBlocLocArr.length; i++) {
    if (
      usedBlocLocArr[i][0] == valX &&
      usedBlocLocArr[i][1] == valY &&
      usedBlocLocArr[i][2] == valDir
    )
      return true;
  }
  usedBlocLocArr.push([valX, valY, valDir]);
  return false;
};

for (let y = 0; y < inData.length; y++) {
  let found = false;
  for (let x = 0; x < inData[y].length; x++)
    if (dirArr.indexOf(getLocItem(x, y, inData)) > -1) {
      setDefaultLocDir(x, y, getLocItem(x, y, inData));
      setLocDir(x, y, getLocItem(x, y, inData));
      found = true;
      break;
    }
  if (found) break;
}

// console.log("currLocDir", currLocDir);
// console.log("defaultLocDir", defaultLocDir);

let replaceLocs = [];
for (let y = 0; y < inData.length; y++) {
  for (let x = 0; x < inData[y].length; x++) {
    //for (let x = 0; x < 4; x++) {
    let usedBlockedLocArr = [];
    let copiedInData = [...inData];
    if (copiedInData[y].at(x) !== ".") continue;
    copiedInData[y] = replaceStringChar(x, "#", copiedInData[y]);
    let exited = false;
    let isLooping = false;
    // console.log("copiedInData[y]", copiedInData[y]);
    // console.log("copiedInData", copiedInData);
    while (!exited) {
      //for (let i = 0; i < 60; i++) {
      if (getLookToTurnRight(copiedInData)) {
        if (checkIfLooping(usedBlockedLocArr)) {
          exited = true;
          isLooping = true;
        }
        turnRight();
      } else if (moveCheckIfExited(copiedInData)) exited = true;
      //   console.log(
      //     "currLocDir",
      //     currLocDir,
      //     "usedBlockedLocArr",
      //     usedBlockedLocArr
      //   );
      //   //if (exited) break;
    }
    if (isLooping) {
      console.log("PUSHING x:", x, "y:", y);
      replaceLocs.push([x, y]);
    }
    resetCurrLocDir();
  }
}

console.log(replaceLocs);
console.log(replaceLocs.length);

// let count = 0;
// inData.forEach((val) => {
//   for (let i = 0; i < val.length; i++) if (val[i] == "X") count = count + 1;
// });

// console.log(count);

// console.log(inData);
// console.log(currLocDir);
// console.log(inData[currLocDir.locY]);
