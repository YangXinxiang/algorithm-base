// 变形的杨辉三角： https://time.geekbang.org/column/article/74788 课后思考

 //const triangleArr = [[5],[7,8],[2,3,4],[4,9,6,1],[7,8,9,4,5]];
const triangleArr = [[5],[7,8],[2,3,4],[4,9,6,1],[7,8,9,4,5]];
 //const triangleArr = [[5],[7,8],[2,3,4]];
let minLen = Infinity;
let count = 0;
function findMinn(rowIndex = 0, columnIndex=0,len = triangleArr[0][0], route = [triangleArr[0][0]]){
    count++
    console.log(`findMinn :: enter, rowIndex = ${rowIndex}, len = ${len}, minLen = ${minLen}, count = ${count},  route = ${route}`)
    if(rowIndex === triangleArr.length-1){
        //console.log(`findMinn :: end, len = ${len}, minLen = ${minLen}, route = ${route}`)
        if(minLen > len){
            //console.log(`findMinn :: end,~~~~~ len = ${len}, minLen = ${minLen}, route = ${route}`)
            minLen = len;
        }
        return;
    }
    const row = triangleArr[rowIndex];  
    for(let column=0; column<row.length; column++){
        
        const nextRowIndex = rowIndex + 1
        if(nextRowIndex < triangleArr.length){
            const nextRow = triangleArr[nextRowIndex];
            // console.log(nextRow)
            if(column === columnIndex){
                const lRoute = [...route];
                lRoute.push(nextRow[columnIndex])
                // 计算左边
                findMinn(nextRowIndex, columnIndex, len + nextRow[columnIndex], lRoute);
                // 计算右边
                const rRoute = [...route];
                rRoute.push(nextRow[columnIndex+1])
                findMinn(nextRowIndex,columnIndex+1, len + nextRow[columnIndex+1], rRoute);
            }           
        }
        
    }
}

function findMinn2(rowIndex = 0, columnIndex=0,len = triangleArr[0][0], route = [triangleArr[0][0]]){
    count++
    console.log(`findMinn222 :: enter, rowIndex = ${rowIndex}, columnIndex = ${columnIndex}, len = ${len}, minLen = ${minLen}, count = ${count},  route = ${route}`)
    if(rowIndex === triangleArr.length-1){
        //console.log(`findMinn :: end, len = ${len}, minLen = ${minLen}, route = ${route}`)
        if(minLen > len){
            //console.log(`findMinn :: end,~~~~~ len = ${len}, minLen = ${minLen}, route = ${route}`)
            minLen = len;
        }
        return;
    }
    const row = triangleArr[rowIndex];
    //console.log(`findMinn :: before for loop, row = ${row}`)
    for(let column=0; column<row.length; column++){
        
        const nextRowIndex = rowIndex + 1
        if(nextRowIndex < triangleArr.length){
            const nextRow = triangleArr[nextRowIndex];
           // console.log(`column = ${column}, nextRow = ${nextRow}, nextRow[column] = ${nextRow[column]}, nextRow[column+1] = ${nextRow[column+1]}`);
            
                const lRoute = [...route];
                lRoute.push(nextRow[column])
                // 计算左边
                findMinn2(nextRowIndex, column, len + nextRow[column], lRoute);
                // 计算右边
                const rRoute = [...route];
                rRoute.push(nextRow[column+1])
                findMinn2(nextRowIndex,column+1, len + nextRow[column+1], rRoute);            
        }
        
    }
}

function findMinn3(rowIndex=0, columnIndex=0, len=triangleArr[0][0], route=[triangleArr[0][0]]){
    console.log(`findMinn333 :: enter, rowIndex = ${rowIndex}, columnIndex = ${columnIndex}, len = ${len}, minLen = ${minLen}, count = ${count},  route = ${route}`)
    // 退出条件
    if(rowIndex === triangleArr.length-1){
        if(minLen > len){
            minLen = len;
        }
        return;
    }
    
    const row = triangleArr[rowIndex];
    for(let column=0; column<row.length; column++){
        const nextRowIndex = rowIndex + 1
        if(nextRowIndex < triangleArr.length){
            if(column === columnIndex){
                const nextRow = triangleArr[nextRowIndex];
                const lRote = [...route];
                lRote.push(nextRow[columnIndex])
                // 走左边
                findMinn3(rowIndex+1, columnIndex, len + nextRow[columnIndex], lRote)
                // 走右边
                const rRote = [...route];
                rRote.push(nextRow[columnIndex+1])
                findMinn3(rowIndex+1, columnIndex+1, len + nextRow[columnIndex+1], rRote)
            }
        }
    }
}

function createTableArr(rows, columns, defaultValue =0){
    console.log(`createTableArr :: enter, rows = ${rows}, columns = ${columns}, defaultValue = ${defaultValue}`);
    const table = [];
    for(let i=0; i<rows; i++){
        const rowArr = new Array(columns)
        rowArr.fill(defaultValue)
        table.push(rowArr)
    }
   // console.log(table);
    return table;
}

function findMinnDP(data){
    const sideCont = data.length;
    const states =  createTableArr(sideCont, sideCont, 0);
    states[0][0] = data[0][0];
    console.log(states)
    console.log(`~~~~~~~~~~~`)
    // 开始动态规划
    for(let rowIndex = 0; rowIndex< sideCont -1; rowIndex ++ ){
        const row = data[rowIndex];
        const nextRowIndex = rowIndex+1;
        const nextRow = data[nextRowIndex];
        for(let column=0; column<row.length; column++){
            const current = states[rowIndex][column];
            // 看左下角的值
            const left = current + nextRow[column];
            if(states[nextRowIndex][column] === 0){
                states[nextRowIndex][column] = left
            }else{
                if(states[nextRowIndex][column] > left){
                    states[nextRowIndex][column] = left
                }
            }
            // 看右下角的值
            const right = current + nextRow[column + 1];
            if(states[nextRowIndex][column+1] === 0){
                states[nextRowIndex][column+1] = right
            }else{
                if(states[nextRowIndex][column+1] > right){
                    states[nextRowIndex][column +1] = right
                }
            }
        }
        
    }
    let min = Math.min(...states[sideCont -1])
    let minIndex = states[sideCont -1].findIndex(v => v===min);
    console.log(min, minIndex)
    // 倒推路径
    // 开始倒推值
    const route = [data[sideCont -1][minIndex]];
    for(let rowIndex = sideCont -1; rowIndex > 0; rowIndex --){
        let preRow = states[rowIndex -1];
        let preData = data[rowIndex -1];
        let preIndex = 0;
        if(minIndex ===0){
            preIndex = 0
        }else if(minIndex === preData.length){
            preIndex = minIndex - 1;
        }else{
            // 父节点有两个，为了方便起见，就只找一条路径就好。
            let pLeft = minIndex-1, pRight = minIndex;
            if(min === preRow[pLeft] + data[rowIndex][minIndex]){
                preIndex = pLeft
            }else{
                preIndex = pRight
            }
        }
        min = preRow[preIndex];
        minIndex = preIndex;
        route.push(data[rowIndex -1][minIndex]);
    }
    console.log(states);
    console.log(`route = ${route}, len = ${route.length}`)
}


function test1(){
    findMinn3()    
    console.log(`test1 :: minLen = ${minLen}`)
}

function  test2(){
    findMinnDP(triangleArr)
}

function startTest(){
    test1();
    test2();
}

startTest();
