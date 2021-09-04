// 练习动态规划: https://time.geekbang.org/column/article/75702

const table = [
    [1,3,5,9],
    [2,1,3,4],
    [5,2,6,7],
    [6,8,4,3]
]
const rowsCount = 4;
const columnCount = 4;
let step =0;
function minDistBT(row=0, column=0, step=0,rotes=[]){
    if(row === rowsCount && column ===columnCount){
        console.log(`step = ${step}`);
        // console.log(rotes);
        return;
    }
    // 往下走一步
    const newRotes = [...rotes];
    if(row+1 < rowsCount){
        newRotes.push({
            value: table[row][column],
            dir:"dwn"
        })
        minDistBT(row+1,column, step + table[row][column], newRotes);
    }
    // 
    // 或者往右走一步
    if(column+1 < columnCount){
        newRotes.push({
            value: table[row][column],
            dir:"rig"
        })
        minDistBT(row,column+1, step + table[row][column], newRotes);
    }    
}

function createTableArr(rows, columns, pad=0){
    const table = [];
    for(let row=0; row<rows; row++){
        const rowArr = new Array(columns);
        rowArr.fill(pad)
        table.push(rowArr)
    }
    return table;
}


function minDistDP() {
    const states = createTableArr(rowsCount, columnCount);
    // 处理首行、首列
    states[0][0] = table[0][0];
    for(let row=1; row<rowsCount; row++){
        states[row][0] = states[row-1][0] + table[row][0];
    }
    for(let column=1; column< columnCount; column++){
        states[0][column] = states[0][column-1] + table[0][column]
    }

    for(let row=1; row<rowsCount; row++){
        // 先处理好首行和首列
        for(let column=1; column <columnCount; column++){
            const left = states[row][column-1];
            const up = states[row-1][column];
            const min = Math.min(left, up) 
            states[row][column] = min + table[row][column];
            
        }
        
    }

    console.log(states);
}

function test1(){
    minDistBT();
    console.log(`~~~~~~~~~~`)
    minDistDP()
}

function startTest(){
    test1()
}

startTest();
