let data = __dirname + "/testdata.txt";
//data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

//add code here:

let inData = inStr.split("\n");
console.log(inData);
