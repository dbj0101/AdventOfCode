let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
// console.log(inData);

const checkOnMap = (loc) => {
  return (
    loc.x > -1 &&
    loc.x < inData[0].length &&
    loc.y > -1 &&
    loc.y < inData.length
  );
};

const checkDist = (loc1, loc2) => {
  let dist = { x: loc2.x - loc1.x, y: loc2.y - loc1.y };
  let ant = {
    x: loc2.x + dist.x,
    y: loc2.y + dist.y,
  };
  //console.log("dist:", dist, "antinode:", ant);
  if (checkOnMap(ant)) {
    let antStr = String(ant.x) + "|" + String(ant.y);
    if (antArr.indexOf(antStr) == -1) antArr.push(antStr);
  }
};

//Build Map() of inData lines
// "0" [[x,y],[x,y],[x,y],[x,y]]
// "A" [[x,y],[x,y],[x,y]]
const antMap = new Map();
const antArr = [];
inData.forEach((val, idx) => {
  for (let i = 0; i < val.length; i++)
    if (val[i] != ".")
      if (antMap.has(val[i])) antMap.get(val[i]).push({ x: i, y: idx });
      else antMap.set(val[i], [{ x: i, y: idx }]);
});

//console.log("antMap", antMap);

//for each signal: for each matching signal:
//find distance between 2 signals, check if distance lies on map
// checkDist({ x: 8, y: 1 }, { x: 5, y: 2 });
// checkDist({ x: 8, y: 1 }, { x: 5, y: 2 });
// checkDist({ x: 8, y: 1 }, { x: 5, y: 2 });
antMap.forEach((val, key) => {
  val.forEach((loc, idx) => {
    for (let i = 0; i < val.length; i++) if (i != idx) checkDist(loc, val[i]);
  });
});

//if distance lies on map add coord string to array if it does not already exist

//console.log(antArr);
console.log(antArr.length);
