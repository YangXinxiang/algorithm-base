// 动态规划练习双11 满减凑单薅羊毛问题： https://time.geekbang.org/column/article/74788

function createTableArr(rows, columns, pad=0){
    const table = [];
    for(let row=0; row<rows; row++){
        const rowArr = new Array(columns);
        rowArr.fill(pad)
        table.push(rowArr)
    }
    return table;
}

function double11Shopping(goodsValues, maxValue, minValue){
    const states = createTableArr(goodsValues.length, maxValue+1); // 因为要多一列0，因此加1
    const goodsCount = goodsValues.length;
    // 先处理第0个物品
    states[0][0]=1; // 不买
    if(goodsValues[0] <= maxValue){ // 第一个商品，如果小于最大阈值，就买
        states[0][goodsValues[0]] = 1; 
    }
    // 开始跟进上一个状态值集合，动态的推导出下一个状态集合。
    for(let i=1; i< goodsValues.length; i++) {
        // 不买，直接拷贝上一行的状态
        for(let j=0; j<=maxValue; j++) {
            if(states[i-1][j]===1){ // 这里表示，如果上一行该状态列有做过决策，准备拷贝这个单元格的值
                states[i][j] = states[i-1][j]; // 拷贝上一行数据
            }
        }
        // 买买买
        for(let j =0; j+goodsValues[i]<=maxValue; j++) { // 买完这个商品后，不能超限，才能购买
            if(states[i-1][j]===1){
                states[i][j+goodsValues[i]] = 1;
            }
            
        }
    }
    // 求出最佳值，最后一行中，大于等于最小值的第一个值，就是最佳值
    const wishValue = states[goodsCount - 1].findIndex((value,index)=>index>=minValue);
    let lastDecisionResult = wishValue;
    console.log(`lastDecisionResult = ${lastDecisionResult}`);
    //console.log(states)
    // 根据这个结果倒推买过的商品
    for(let i=goodsCount-1; i>=1; i--) {
        if(lastDecisionResult - goodsValues[i] >0 && states[i-1][lastDecisionResult-goodsValues[i]] === 1){            
            console.log(`picked this goods, index = ${i}, value = ${goodsValues[i]}, lastDecisionResult = ${lastDecisionResult}`)
            //lastDecisionResult = lastDecisionResult-goodsValues[i];
        }
    }
    // 也要特殊关注一下第0个物品
    if(lastDecisionResult !=0) {
        console.log(`picked this goods, index = ${0}, value = ${goodsValues[0]}, lastDecisionResult = ${lastDecisionResult}`)
    }
}

function test1(){
    const goodsValues = [5,3,7,12,8,6,2];
    double11Shopping(goodsValues,15, 10);
}

function startTest(){
    test1()
}

startTest();