let data = __dirname + "/testdata.txt";
//data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");
//console.log(inData);

let finalLocations = [];
let almanacItems = new Map();
let currentItem = {};
currentItem.values = [];
currentItem.ranges = [];
for (item of inData) {
  if (item === "") {
    almanacItems.set(currentItem.source, currentItem);
    currentItem = {};
    currentItem.values = [];
    currentItem.ranges = [];
  } else if (String(item).includes("seeds:")) {
    currentItem.source = "seeds";
    currentItem.destination = "seed";
    for (num of item.split(" ")) {
      if (num != "seeds:") {
        currentItem.values.push(Number(num));
      }
    }
  } else if (String(item).includes("-to-")) {
    const [source, destination] = String(item).split(" ")[0].split("-to-");
    currentItem.source = source;
    currentItem.destination = destination;
  } else {
    range = {};
    const [dest, source, count] = item.split(" ");
    //console.log("source:", source, "dest:", dest, "count:", count);
    range.sourceMin = Number(source);
    range.sourceMax = Number(source) + Number(count) - 1;
    range.destinationMin = Number(dest);
    range.destinationMax = Number(dest) + Number(count) - 1;
    range.count = Number(count);
    currentItem.ranges.push(range);
  }
}
console.log(almanacItems);

console.log(almanacItems.get("seed").ranges[0]);
