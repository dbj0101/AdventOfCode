let dir = "AdventOfCode2022/Day2";
let testdata = "/Users/davidbrinton/Documents/VSCode/Javascript/"+dir+"/testdata.txt"
let data = "/Users/davidbrinton/Documents/VSCode/Javascript/"+dir+"/data.txt"

let fs = require("fs");
let inStr = fs.readFileSync(data).toString('utf-8');
//var lines = inStr.split("\n");
//console.log(inStr);

let inData = inStr.split("\n");
//console.log(inData);
let iCount=0;
let iElf=0;
let elfCal = [0]
for( s of inData) {
    //console.log(""+iCount+":"+s);
    iCount+=1;
    
    if(s=='') {
        iElf+=1;
        elfCal.push(0);
    }
    else {
        elfCal[iElf]+=Number(s);
    }
}

let sortedArray = elfCal.sort((a, b) => b-a);
console.log(Number(sortedArray[0]) + Number(sortedArray[1]) + Number(sortedArray[2]));
