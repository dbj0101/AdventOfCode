let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

const usedArr = [];
const plotArr = [];

const dirArr = [
  { dir: "n", x: 0, y: -1 },
  { dir: "e", x: 1, y: 0 },
  { dir: "s", x: 0, y: 1 },
  { dir: "w", x: -1, y: 0 },
];

const checkOnMap = (x, y, mapArr) => {
  return x > -1 && x < mapArr[0].length && y > -1 && y < mapArr.length;
};

const checkLocUsed = (x, y) => {
  return usedArr.indexOf(String(x) + "|" + String(y)) > -1;
};

const checkLocVal = (x, y, mapArr, inVal) => {
  if (!checkOnMap(x, y, mapArr) || checkLocUsed(x, y)) return false;
  return mapArr[y].at(x) == inVal;
};

const buildPlot = (x, y, mapArr, plot) => {
  //console.log("BEFORE x", x, "y", y, "plot", plot);
  if (checkLocUsed(x, y)) return;
  if (plot == undefined || plot == null) {
    plot = { x, y };
    plot.val = mapArr[y].at(x);
    plot.members = [String(x) + "|" + String(y)];
    usedArr.push(String(x) + "|" + String(y));
  } else if (checkLocVal(x, y, mapArr, mapArr[y].at(x))) {
    plot.members.push(String(x) + "|" + String(y));
    usedArr.push(String(x) + "|" + String(y));
  } else return;
  //successful added plot member if at this point
  dirArr.forEach((dir) => {
    let newX = x + dir.x;
    let newY = y + dir.y;
    if (checkLocVal(newX, newY, mapArr, plot.val))
      buildPlot(newX, newY, mapArr, plot);
  });
  //console.log("AFTER x", x, "y", y, "plot", plot);
  return plot;
};

const calcArea = (plot) => plot.members.length;

const calcPerimeter = (plot) => {
  let total = 0;
  plot.members.forEach((val) => {
    let x = Number(val.split("|")[0]);
    let y = Number(val.split("|")[1]);
    dirArr.forEach((dir) => {
      //if (!checkLocVal(plot.x + dir.x, plot.y + dir.y, inData, plot.val)) total++;
      if (!checkLocVal(x + dir.x, y + dir.y, inData, plot.val)) total++;
    });
  });
  return total;
};

// console.log("Check if A", checkLocVal(0, 0, inData, "A"));
// console.log("Check if B", checkLocVal(0, 0, inData, "B"));

// let plot = buildPlot(0, 0, inData);
// console.log(plot);
// plot = buildPlot(1, 0, inData);
// console.log(plot);
// plot = buildPlot(2, 0, inData);
// console.log(plot);
// plot = buildPlot(3, 0, inData);
// console.log(plot);
// plot = buildPlot(0, 1, inData);
// console.log(plot);

inData.forEach((val, y) => {
  for (let x = 0; x < val.length; x++) {
    let plot = buildPlot(x, y, inData);
    if (plot) plotArr.push(plot);
  }
});
//clear out usedArr since finished building
usedArr.splice(0, usedArr.length);

// console.log(plotArr);
// console.log(plotArr[0]);
// console.log(
//   "area",
//   calcArea(plotArr[0]),
//   "perimeter",
//   calcPerimeter(plotArr[0])
// );

let total = 0;
plotArr.forEach((plot) => {
  total = total + calcArea(plot) * calcPerimeter(plot);
});
console.log(total);
