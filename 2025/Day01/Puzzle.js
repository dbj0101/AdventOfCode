let data = __dirname + "/testdata.txt";
//
data = __dirname + "/data.txt";

let fs = require("fs");
inStr = fs.readFileSync(data).toString("utf-8");

let inData = inStr.split("\n");

const padLock = {
    currentLoc: 50,
    min: 0,
    max: 99
}

const moveDir = (pl, dir, num) => {
    while(num > pl.max){
        num = num - (pl.max + 1);
    }
    //console.log(pl.currentLoc, dir, num);
    if(dir=="L") {
        if(num > pl.currentLoc){
            pl.currentLoc = pl.max - num + pl.currentLoc + 1;
        }
        else
            pl.currentLoc = pl.currentLoc - num;
    }
    else if(dir=="R") {
        if((pl.currentLoc + num)>pl.max) {
            pl.currentLoc = (pl.max - pl.currentLoc - num + 1) * (-1);
        }
        else
            pl.currentLoc = pl.currentLoc + num;
    }
    //console.log(pl.currentLoc);
}

const checkMove = (pl, moveStr) => {
    const dir = moveStr.slice(0,1)
    let num = Number(moveStr.slice(1));
    moveDir(pl, dir, num);
}

let count=0;
//console.log("Starting Location", padLock.currentLoc);
inData.forEach((val) => {
    checkMove(padLock, val)
    if(padLock.currentLoc==0 || padLock.currentLoc==-0)
        count = count + 1;
    console.log("Current Location", padLock.currentLoc, "Movement", val, "Count",count);
});
console.log("Total Count",count);
