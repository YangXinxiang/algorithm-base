// 动态规划的思路解决01背包基础版问题： https://time.geekbang.org/column/article/74788

function createTableArr(rows, column){
    let arr = []
    for(let i=0; i<rows; i++){
        const row = [];
        for(j=0; j<column; j++){
            row.push(0)
        }
        
        arr.push(row)
    }
    return arr;
}

function knapsack(goods, capacity){
    let states = createTableArr(goods.length, capacity+1)
    // console.log(states)
    states[0][0] = 1; // 第一行数据特殊处理
    if(goods[0] <= capacity){
        states[0][goods[0]] = 1;
    }
    // 动态规划状态转移
    for(let i=1; i<goods.length; i++){
        // 不把第i个放入背包中
        for(let j=0; j<=capacity; j++){
            if(states[i-1][j]===1) states[i][j] =states[i-1][j];
        }
        // 把i放入背包中
        for(let j=0; j<=capacity-goods[j]; j++){
            if(states[i-1][j]===1) states[i][j+goods[j]] =1;
        }
    }
    return states;
    for(let i=capacity; i>=0; i--){
        if(states[goods.length - 1][i] === 1);
        return {
            maxValue: i,
            row: states[goods.length - 1]
        };
    }
    return 0;
}

function test(){
    const goods = [2,2,4,6,3];
    const capacity = 9;
    const rst = knapsack(goods, capacity);
    console.log(rst)
}

test()
