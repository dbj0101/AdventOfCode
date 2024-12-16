let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

let totalRating = 0;

const trailArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const dirArr = [
  { dir: "n", xy: [0, -1] },
  { dir: "e", xy: [1, 0] },
  { dir: "s", xy: [0, 1] },
  { dir: "w", xy: [-1, 0] },
];

const checkOnMap = (x, y, mapArr) => {
  return x > -1 && x < mapArr[0].length && y > -1 && y < mapArr.length;
};

const checkTrail = (x, y, mapArr, trailIdx, trailEndArr) => {
  if (mapArr[y].at(x) == trailArr[trailIdx]) {
    //console.log((x, y, trailArr[trailIdx]));
    if (trailArr[trailIdx] == trailArr[trailArr.length - 1]) {
      //console.log("SUCCESS POSITION", x, y);
      totalRating++;
      let posStr = String(x) + "|" + String(y);
      if (trailEndArr.indexOf(posStr) == -1) trailEndArr.push(posStr);
    } else {
      dirArr.forEach((val, idx) => {
        let newX = x + val.xy[0];
        let newY = y + val.xy[1];
        if (checkOnMap(newX, newY, mapArr))
          checkTrail(newX, newY, mapArr, trailIdx + 1, trailEndArr);
      });
    }
  }
};

let total = 0;
for (let y = 0; y < inData.length; y++) {
  for (let x = 0; x < inData[y].length; x++) {
    // console.log(
    //   "check:",
    //   x,
    //   y,
    //   inData[y],
    //   trailArr[0],
    //   String(inData[y]).at(x)
    // );
    let trailEndArr = [];
    checkTrail(x, y, inData, 0, trailEndArr);
    if (trailEndArr.length > 0) {
      //console.log(x, y, trailEndArr);
      total = total + trailEndArr.length;
    }
  }
}
console.log("total", total);
console.log("totalRating", totalRating);
