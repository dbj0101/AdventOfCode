let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

const searchArr = ["X", "M", "A", "S"];

const dirArr = [
  {
    dir: "leftUp",
    val: [
      { x: -1, y: -1 },
      { x: -2, y: -2 },
      { x: -3, y: -3 },
      //{ x: -4, y: -4 },
    ],
  },
  {
    dir: "upUp",
    val: [
      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: 0, y: -3 },
      //{ x: 0, y: -4 },
    ],
  },
  {
    dir: "rightUp",
    val: [
      { x: 1, y: -1 },
      { x: 2, y: -2 },
      { x: 3, y: -3 },
      //{ x: 4, y: -4 },
    ],
  },

  {
    dir: "leftLeft",
    val: [
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: -3, y: 0 },
      //{ x: -4, y: 0 },
    ],
  },
  {
    dir: "rightRight",
    val: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      // { x: 4, y: 0 },
    ],
  },

  {
    dir: "leftDown",
    val: [
      { x: -1, y: 1 },
      { x: -2, y: 2 },
      { x: -3, y: 3 },
      //{ x: -4, y: 4 },
    ],
  },
  {
    dir: "downDown",
    val: [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      //{ x: 0, y: 4 },
    ],
  },
  {
    dir: "rightDown",
    val: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      //{ x: 4, y: 4 },
    ],
  },
];

let total = 0;

const checkLoc = (inX, inY, inCheckVal) => inData[inY].at(inX) === inCheckVal;

const checkDir = (inX, inY) => {
  dirArr.forEach((dir, idx) => {
    let isValid = true;
    for (let i = 0; i < dir.val.length; i++) {
      let currX = inX + dir.val[i].x;
      let currY = inY + dir.val[i].y;
      let strToSearch = inData[inY];
      if (
        currX < 0 ||
        currX >= strToSearch.length ||
        currY < 0 ||
        currY >= inData.length ||
        !checkLoc(currX, currY, searchArr[i + 1])
      ) {
        isValid = false;
        break;
      }
      //   else {
      //     console.log("Direction:",dir.dir,"X:",currX,"Y:",currY,"checkVal:",searchArr[i + 1],"locVal:",inData[currY].at(currX));
      //   }
    }
    if (isValid) total = total + 1;
  });
};

const checkRow = (inY) => {
  for (let i = 0; i < inData[inY].length; i++) {
    //if matches first character, search all directions available
    if (checkLoc(i, inY, searchArr[0])) {
      checkDir(i, inY);
    }
  }
};

//console.log(inData);
inData.forEach((val, idx) => checkRow(idx));
console.log(total);
