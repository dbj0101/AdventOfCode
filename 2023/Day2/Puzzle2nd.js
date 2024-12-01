let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

const sumGames = inData.reduce((total, currentValue) => {
  //console.log(currentValue);
  let [gameNum, gamePlay] = currentValue.split(":");
  //console.log("gamenum", Number(gameNum.trim().replace("Game ", "")));
  //console.log("gameplay", gamePlay.trim());
  let num = Number(gameNum.trim().replace("Game ", ""));
  //console.log("num", num);
  //return (sumTotal += num);
  const gamebag = new Map([
    ["red", 0],
    ["green", 0],
    ["blue", 0],
  ]);
  for (rnd of gamePlay.trim().split("; ")) {
    for (draw of rnd.split(", ")) {
      [count, color] = draw.split(" ");
      //console.log("count:", count, "color:", color);
      if (Number(count) > gamebag.get(color)) {
        gamebag.set(color, Number(count));
      }
    }
  }
  //console.log("Legit Game:", gameNum);
  return (total +=
    gamebag.get("red") * gamebag.get("green") * gamebag.get("blue"));
}, 0);

console.log("sumGames", sumGames);
