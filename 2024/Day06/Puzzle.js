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

const setLocDir = (x, y, dir) => {
  currLocDir.locX = x;
  currLocDir.locY = y;
  currLocDir.dir = dir;
  currLocDir.dirIndex = dirArr.indexOf(dir);
};
const getLookToTurnRight = () => {
  //const dir = lookArr[dirArr.indexOf(currLocDir.dir)];
  //console.log("currLocDir", currLocDir, "look dir", dir);
  let newX = currLocDir.locX + lookArr[currLocDir.dirIndex].look[0];
  let newY = currLocDir.locY + lookArr[currLocDir.dirIndex].look[1];
  if (
    newY < 0 ||
    newY >= inData.length ||
    newX < 0 ||
    newX >= inData[newY].length
  )
    return false;
  return inData[newY].at(newX) == "#";
};
const getLocItem = (x, y) => inData[y].at(x);
const moveCheckIfExited = () => {
  let newX = currLocDir.locX + lookArr[currLocDir.dirIndex].look[0];
  let newY = currLocDir.locY + lookArr[currLocDir.dirIndex].look[1];
  inData[currLocDir.locY] = replaceStringChar(
    currLocDir.locX,
    "X",
    inData[currLocDir.locY]
  );
  currLocDir.locX = newX;
  currLocDir.locY = newY;
  if (
    newY < 0 ||
    newY >= inData.length ||
    newX < 0 ||
    newX >= inData[newY].length
  )
    return true;
  return false;
};
const turnRight = () => {
  currLocDir.dirIndex++;
  if (currLocDir.dirIndex >= dirArr.length) currLocDir.dirIndex = 0;
  currLocDir.dir = dirArr[currLocDir.dirIndex];
};

for (let y = 0; y < inData.length; y++) {
  let found = false;
  for (let x = 0; x < inData[y].length; x++)
    if (dirArr.indexOf(getLocItem(x, y)) > -1) {
      setLocDir(x, y, getLocItem(x, y));
      found = true;
      break;
    }
  if (found) break;
}
//console.log("currLocDir", currLocDir);

let exited = false;
while (!exited) {
  // for (let i = 0; i < 3; i++) {
  if (getLookToTurnRight()) turnRight();
  else if (moveCheckIfExited()) exited = true;
  //console.log("currLocDir", currLocDir);
}

let count = 0;
inData.forEach((val) => {
  for (let i = 0; i < val.length; i++) if (val[i] == "X") count = count + 1;
});

console.log(count);

// console.log(inData);
// console.log(currLocDir);
// console.log(inData[currLocDir.locY]);
