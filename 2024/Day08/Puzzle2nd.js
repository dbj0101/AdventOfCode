let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
// console.log(inData);

const checkOnMap = (loc, key) => {
  //   console.log(
  //     "checkOnMap x:",
  //     loc.x,
  //     "y:",
  //     loc.y,
  //     "key:",
  //     key,
  //     "onMap",
  //     loc.x > -1 &&
  //       loc.x < inData[0].length &&
  //       loc.y > -1 &&
  //       loc.y < inData.length
  //   );
  return (
    loc.x > -1 &&
    loc.x < inData[0].length &&
    loc.y > -1 &&
    loc.y < inData.length
  );
};

const addUniqueAnt = (ant, key) => {
  let antStr = String(ant.x) + "|" + String(ant.y); // + "|" + String(key);
  if (antArr.indexOf(antStr) == -1) antArr.push(antStr);
};

const checkDist = (loc1, loc2, key) => {
  let dist = { x: loc2.x - loc1.x, y: loc2.y - loc1.y };
  let ant = {
    x: loc2.x + dist.x,
    y: loc2.y + dist.y,
  };
  //console.log("dist:", dist, "antinode:", ant);
  while (checkOnMap(ant, key)) {
    addUniqueAnt(ant, key);
    ant.x = ant.x + dist.x;
    ant.y = ant.y + dist.y;
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
  if (val.length > 1) {
    val.forEach((loc, idx) => {
      addUniqueAnt(loc, key);
      for (let i = 0; i < val.length; i++)
        if (i != idx) checkDist(loc, val[i], key);
    });
  }
});

//if distance lies on map add coord string to array if it does not already exist

//console.log(antArr);
console.log("antArr.length", antArr.length);
