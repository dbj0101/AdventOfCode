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
    let zeroCount=0;
    while(num > pl.max){
        num = num - (pl.max + 1);
        zeroCount = zeroCount + 1;
    }
    //console.log(pl.currentLoc, dir, num);
    if(dir=="L") {
        if(num > pl.currentLoc){
            if(pl.currentLoc>0)
                zeroCount = zeroCount + 1;
            pl.currentLoc = pl.max - num + pl.currentLoc + 1;
        }
        else{
            pl.currentLoc = pl.currentLoc - num;
            if((pl.currentLoc==0 || pl.currentLoc==-0) && num>0){
                zeroCount = zeroCount + 1;
                pl.currentLoc=0;
            }
        }
    }
    else if(dir=="R") {
        if((pl.currentLoc + num)>pl.max) {
            pl.currentLoc = (pl.max - pl.currentLoc - num + 1) * (-1);
            zeroCount = zeroCount + 1;
        }
        else{
            pl.currentLoc = pl.currentLoc + num;
            // if((pl.currentLoc==0 || pl.currentLoc==-0) && num>0){
            //     zeroCount = zeroCount + 1;
            //     pl.currentLoc=0;
            // }
        }
    }
    //console.log(pl.currentLoc);
    return zeroCount;
}

const checkMove = (pl, moveStr) => {
    const dir = moveStr.slice(0,1)
    let num = Number(moveStr.slice(1));
    return moveDir(pl, dir, num);
}

let count=0;
//console.log("Starting Location", padLock.currentLoc);
inData.forEach((val) => {
    let inc = checkMove(padLock, val)
    count = count + inc;
    console.log("New Location", padLock.currentLoc, "Movement", val, "Count",count, "Pass Zero",inc);
});
console.log("Total Count",count);
//6612 is too low
