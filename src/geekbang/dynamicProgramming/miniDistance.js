// 练习动态规划: https://time.geekbang.org/column/article/75702

const table = [
    [1,3,5,9],
    [2,1,3,4],
    [5,2,6,7],
    [6,8,4,3]
]
const rowsCount = 4;
const columnCount = 4;
let step;
function minDistBT(row=0, column=0, step=0){
    if(row === rowsCount-1 && column ===columnCount-1){
        console.log(`step = ${step}`);
        return;
    }
    // 往下走一步
    if(row+1 < rowsCount){
        minDistBT(row+1,column, step + table[row][column]);
    }
    // 
    // 或者往右走一步
    if(column+1 < columnCount){
        minDistBT(row,column+1, step + table[row][column]);
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
    states[0][0] = table[0][0];

    for(let row=0; row<rowsCount; row++){
        // 先处理好首行和首列
        for(let column=0; column <columnCount; column++){
            if(row ===0 && column>0){
                states[row][column] = states[row][column-1] + table[row][column]
            }            
            if(column===0 && row>0 ){
                states[row][column] = states[row-1][column] + table[row][column]
            }
            
        }
        
    }

    console.log(states);
}

function test1(){
    // minDistBT();
    minDistDP()
}

function startTest(){
    test1()
}

startTest();
