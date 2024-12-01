let dir = "AdventOfCode2022/Day1";
let testData = "/Users/davidbrinton/Documents/VSCode/Javascript/"+dir+"/testdata.txt"
let data = "/Users/davidbrinton/Documents/VSCode/Javascript/"+dir+"/data.txt"

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

console.log(Math.max(...elfCal));
//console.log(elfCal);


