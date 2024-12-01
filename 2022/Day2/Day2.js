let dir = "AdventOfCode2022/Day2";
let testdata = "/Users/davidbrinton/Documents/VSCode/Javascript/"+dir+"/testdata.txt"
let data = "/Users/davidbrinton/Documents/VSCode/Javascript/"+dir+"/data.txt"

let fs = require("fs");
let inStr = fs.readFileSync(testdata).toString('utf-8');


let inData = inStr.split("\n");
console.log(inData);

iCount=0;
for( s of inData) {
    console.log(""+iCount+": "+s);
    iCount+=1;
}

//console.log(Math.max(...elfCal));
//console.log(elfCal);


