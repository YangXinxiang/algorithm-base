// 变形的杨辉三角： https://time.geekbang.org/column/article/74788 课后思考

 //const triangleElements = [[5],[7,8],[2,3,4],[4,9,6,1],[7,8,9,4,5]];
 const triangleElements = [[5],[7,8],[2,3,4],[4,9,6,1],[7,8,9,4,5]];
 //const triangleElements = [[5],[7,8],[2,3,4]];
let minLen = Infinity;
// let count = 0;
function findMinn(rowIndex = 0, columnIndex=0,len = triangleElements[0][0], route = [triangleElements[0][0]]){
    count++
    console.log(`findMinn :: enter, rowIndex = ${rowIndex}, len = ${len}, minLen = ${minLen}, count = ${count},  route = ${route}`)
    if(rowIndex === triangleElements.length-1){
        //console.log(`findMinn :: end, len = ${len}, minLen = ${minLen}, route = ${route}`)
        if(minLen > len){
            //console.log(`findMinn :: end,~~~~~ len = ${len}, minLen = ${minLen}, route = ${route}`)
            minLen = len;
        }
        return;
    }
    const row = triangleElements[rowIndex];  
    for(let column=0; column<row.length; column++){
        
        const nextRowIndex = rowIndex + 1
        if(nextRowIndex < triangleElements.length){
            const nextRow = triangleElements[nextRowIndex];
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

function findMinn2(rowIndex = 0, columnIndex=0,len = triangleElements[0][0], route = [triangleElements[0][0]]){
    count++
    console.log(`findMinn222 :: enter, rowIndex = ${rowIndex}, columnIndex = ${columnIndex}, len = ${len}, minLen = ${minLen}, count = ${count},  route = ${route}`)
    if(rowIndex === triangleElements.length-1){
        //console.log(`findMinn :: end, len = ${len}, minLen = ${minLen}, route = ${route}`)
        if(minLen > len){
            //console.log(`findMinn :: end,~~~~~ len = ${len}, minLen = ${minLen}, route = ${route}`)
            minLen = len;
        }
        return;
    }
    const row = triangleElements[rowIndex];
    //console.log(`findMinn :: before for loop, row = ${row}`)
    for(let column=0; column<row.length; column++){
        
        const nextRowIndex = rowIndex + 1
        if(nextRowIndex < triangleElements.length){
            const nextRow = triangleElements[nextRowIndex];
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

/**
 * 回溯方式解决【变形杨辉三角】最短路径：把每一条可能的路径都走完，找到最短路径
 * @param {*} rowIndex, 当前行元素的index,
 * @param {*} columnIndex ， 当前列元素Index
 * @param {*} len , 当前长度总和
 * @param {*} route，记录路径 
 * @returns 
 */
function findMinLenBT(rowIndex=0, columnIndex=0, len=triangleElements[0][0], route=[triangleElements[0][0]]){
    console.log(`findMinLenBT :: enter, rowIndex = ${rowIndex}, columnIndex = ${columnIndex}, len = ${len}, minLen = ${minLen},   route = ${route}`)
    // 退出条件
    if(rowIndex === triangleElements.length-1){
        if(minLen > len){
            minLen = len; // 找到最小值
        }
        return;
    }    
    const row = triangleElements[rowIndex]; // 当前行
    for(let column=0; column<row.length; column++){
        const nextRowIndex = rowIndex + 1
        if(nextRowIndex < triangleElements.length){
            // 这个判断很关键，每次只处理该列元素的值就好，因为每个元素往下只有两个元素可走
            if(column === columnIndex){
                const nextRow = triangleElements[nextRowIndex];
                const leftRote = [...route]; // copy 一份路径记录
                leftRote.push(nextRow[columnIndex])
                // 走左边
                findMinLenBT(rowIndex+1, columnIndex, len + nextRow[columnIndex], leftRote)
                // 走右边
                const rightRote = [...route];
                rightRote.push(nextRow[columnIndex+1])
                findMinLenBT(rowIndex+1, columnIndex+1, len + nextRow[columnIndex+1], rightRote)
            }
        }
    }
}

/**
 * 创建一个表格（二维数组）
 * @param {*} rows 
 * @param {*} columns 
 * @param {*} defaultValue 
 * @returns 
 */
function createTableArr(rows, columns, defaultValue =0){
    console.log(`createTableArr :: enter, rows = ${rows}, columns = ${columns}, defaultValue = ${defaultValue}`);
    const table = [];
    for(let i=0; i<rows; i++){
        const rowArr = new Array(columns)
        rowArr.fill(defaultValue)
        table.push(rowArr)
    }
    return table;
}
/**
 * 用动态规划方式求【变形杨辉三角】最短路径
 * @param {*} data 
 * @returns 
 */
function findMinLenDP(data) {
    const sideCont = data.length;
    const states =  createTableArr(sideCont, sideCont, 0);
    states[0][0] = data[0][0];
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
            if(states[nextRowIndex][column+1] === 0) {
                states[nextRowIndex][column+1] = right
            }else{
                if(states[nextRowIndex][column+1] > right) {
                    states[nextRowIndex][column +1] = right
                }
            }
        }
        
    }
    const totalMin = Math.min(...states[sideCont -1]); // 找到最短路径
    const totalMinIndex = states[sideCont -1].findIndex(v => v===totalMin); // 找到最短路径和的状态索引
    console.log(`findMinLenDP :: got result, totalMin = ${totalMin}, totalMinIndex = ${totalMinIndex}`);
    return {
        totalMin,
    }    
}

/**
 * 用动态规划方式求【变形杨辉三角】最短路径值，同时计算出所经过的路径节点
 * @param {*} data 
 * @returns 
 */
 function findMinLenDP2(data) {
    const sideCont = data.length;
    const states =  createTableArr(sideCont, sideCont, 0);
    states[0][0] = data[0][0];
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
            if(states[nextRowIndex][column+1] === 0) {
                states[nextRowIndex][column+1] = right
            }else{
                if(states[nextRowIndex][column+1] > right) {
                    states[nextRowIndex][column +1] = right
                }
            }
        }
        
    }
    const totalMin = Math.min(...states[sideCont -1]); // 找到最短路径
    const totalMinIndex = states[sideCont -1].findIndex(v => v===totalMin); // 找到最短路径和的状态索引
    console.log(`findMinLenDP2 :: got result, totalMin = ${totalMin}, totalMinIndex = ${totalMinIndex}`);

    // 倒推该最优解所经过的节点
    let min = totalMin;
    let minIndex = totalMinIndex;
    const route = [ data[sideCont -1][minIndex] ];
    for(let rowIndex = sideCont -1; rowIndex > 0; rowIndex --){
        let preStateRow = states[rowIndex -1];
        let preDataRow = data[rowIndex -1];
        let preIndex = 0;
        if(minIndex ===0){
            preIndex = 0
        }else if(minIndex === preDataRow.length){
            preIndex = minIndex - 1;
        }else{
            // 父节点有两个，两个值可能是一样的，为了方便起见，就只找一条路径就好。
            let pLeft = minIndex-1, pRight = minIndex;
            if(min === preStateRow[pLeft] + data[rowIndex][minIndex]){
                preIndex = pLeft
            }else{
                preIndex = pRight
            }
        }
        min = preStateRow[preIndex];
        minIndex = preIndex;
        route.push(data[rowIndex -1][minIndex]);
    }
    // 反转一下路径，从头开始看
    route.reverse()
    console.log(`findMinLenDP2 :: end, route = ${route}`);
    console.log(states);
    return {
        totalMin,
        route,
    }
}


/**
 * 用贪心算法思路求解【变形杨辉三角】最短路径
 * @param {*} data 
 */
function findMinLenTX(data){
    const route = [];
    let currentColumn = 0;
    let minLen =  data[0][0]; // 特殊处理初始值。
    route.push(data[0][0]);
    for(let rowIndex=0; rowIndex < data.length -1; rowIndex++) {
        const nextDataRowIdex = rowIndex + 1;
        const nextDataRow = data[nextDataRowIdex];
        const left = nextDataRow[currentColumn];
        const right = nextDataRow[currentColumn + 1];
        // 决策下一步往哪走： 每一个阶段都选小的
        if(left > right){
            route.push(right);
            minLen += right
            currentColumn = currentColumn + 1;
        }else{
            route.push(left);
            minLen += left
        }
    }
    console.log(`findMinLenTX :: end, minLen = ${minLen}, route = ${route}`)
    return minLen
}

function test1(){
    findMinLenBT()    
    console.log(`test1 :: minLen = ${minLen}`)
}

function  test2(){
    findMinLenDP(triangleElements)
}
function  test3(){
    findMinLenDP2(triangleElements)
}
function  test4(){
    findMinLenTX(triangleElements)
}
function startTest(){
//     test1();
//    test2();
    test3();
    test4();
}

startTest();
