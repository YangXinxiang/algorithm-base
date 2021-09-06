// 练习动态规划: https://time.geekbang.org/column/article/75702

const table = [
    [1,3,5,9],
    [2,1,3,4],
    [5,2,6,7],
    [6,8,4,3]
]
const table2 = [
    [1,3,5,9,0],
    [2,1,3,4,0],
    [5,2,6,7,0],
    [6,8,4,3,0],
    [0,0,0,0,0],
]

const table3 = [
    [1, 2,  3,  4,  0],
    [5, 6,  7,  8,  0],
    [9, 10, 11, 12, 0],
    [13,14, 15, 16, 0],
    [0, 0,  0,  0,  0],
]
const rowsCount = 4;
const columnCount = 4;
let step =0;
function minDistBT(table, row=0, column=0, dist=0, rowsCount=4, columnCount=4){
    //console.log(`minDistBT :: enter, row = ${row}, column = ${column}`)
    dist = dist+ table[row][column]
    if(row === rowsCount-1 && column ===columnCount-1){
        console.log(`minDistBT :: dist = ${dist}`);
        return;
    }
    // 往下走一步
    if(row< rowsCount-1){        
        minDistBT(table,row+1,column, dist,rowsCount,columnCount);
    }
    // 
    // 或者往右走一步
    if(column< columnCount-1){       
        minDistBT(table,row,column+1,dist,rowsCount,columnCount);
    }    
}


let minDist = 0; // 全局变量或者成员变量
// 调用方式：minDistBacktracing(0, 0, 0, w, n);
function minDistBT5(i, j, dist,  w,  n, routes=[]) { 
    // console.log(`minDistBT5 :: enter, row = ${i}, column = ${j}`)
    // 到达了n-1, n-1这个位置了，这里看着有点奇怪哈，你自己举个例子看下 
    
    if (i == n-1 && j == n-1) { 
        console.log(`minDistBT5 :: enter, dist = ${dist}, routes = ${routes}`)
        if(dist <=12){
            
        }
       
        // console.log(`minDistBT5 :: enter, dist = ${dist}, routes = ${routes}`)
        if (dist < minDist) minDist = dist; return; 
    } 
    const newRotes = [...routes]
    newRotes.push(w[i][j])
    if (i < n-1) { // 往下走，更新i=i+1, j=j 
        minDistBT5(i + 1, j, dist+w[i][j], w, n, newRotes); 
    } if (j < n-1) { // 往右走，更新i=i, j=j+1 
        minDistBT5(i, j+1, dist+w[i][j], w, n,newRotes); 
    }
}


let MIN_DIS = Infinity;
function minDisByBT6( i,  j,  w, n, distance) {
        distance += w[i][j];
        if (i == n - 1 && j == n - 1) {
            console.log(`minDisByBT6 :: distance = ${distance}`)
            if (distance < MIN_DIS) MIN_DIS = distance;
            return;
        }
        if (i < n - 1) {
            minDisByBT6(i + 1, j, w, n, distance);
        }
        if (j < n - 1) {
            minDisByBT6(i, j + 1, w, n, distance);
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























function minDistDP2(table){ 
    const rowsCount =  table.length;
    const columnCount = table[0].length;
    const states=createTableArr(rowsCount, columnCount);
    //处理首个元素
    states[0][0] += table[0][0];
    // 处理首行
    for(let i=1; i< columnCount; i++){
        states[0][i] = states[0][i-1] + table[0][i];
    }
    // 处理首列
    for(let i=1; i< rowsCount; i++){
        states[i][0] = states[i-1][0] +  table[i][0];
    }
    // 根据上一阶段决策，推到下一阶段决策
    for(let row=1; row<rowsCount; row++){
        for(let column=1; column< columnCount; column++){
            const left = states[row][column-1];
            const up = states[row-1][column];
            states[row][column] = Math.min(left , up ) + table[row][column];
        }
    }
    console.log(states);
}



const cache = new Map();
let cacheUseCount = 0;
// 动态规划 ：  递归动态规划方式实现最小距离问题，特别像备忘录+回溯的方式。
function minDistDP3(table, row, column){
    if(row===0 && column ===0){
        return table[row][column]
    }
    const cacheKey = `row${row}_column${column}`;
    if(cache.get(cacheKey) >0) {
        cacheUseCount++;
        console.log(`minDistDP3 :: end, cacheUseCount = ${cacheUseCount}`)
        return cache.get(cacheKey);
    }
    // 上一个
    let up = 0;
    if(row-1>=0){
        up = minDistDP3(table, row-1, column);
    }
    let left = 0;
    if(column -1 >=0){
        left = minDistDP3(table, row, column-1);
    }
    const current = table[row][column] + Math.min(up, left);
    cache.set(cacheKey, current);
    console.log(`minDistDP3 :: end, current = ${current}`)
    return current
}







function test1(){
    minDistBT();
    console.log(`~~~~~~~~~~`)
    minDistDP()
}

function test2(){
    //minDistBT5(0,0,0,table3,4);
    // minDisByBT6(0,0,table2,4,0)
    // minDistBT(table2,0,0,0,4,4)
    // minDistDP2(table);
    const result = minDistDP3(table,table.length-1, table.length-1);
    console.log(`test2 :: end, minDistDP3 result = ${result}`)
}
function startTest(){
    //test1()
    test2()
}

startTest();
