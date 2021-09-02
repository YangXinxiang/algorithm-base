// 01背包问题,动态规划练习： https://time.geekbang.org/column/article/74788
// 需求： 对于一组不同重量、不同价值、不可分割的物品，我们选择将某些物品装入背包，
// 在满足背包最大重量限制的前提下，背包中可装入物品的总价值最大是多少呢？

let maxV = 0; // 结果放到maxV中
const goods =   [2,2,4,6,3]; // 物品的重量
const values = [3,4,8,9,6]; // 物品的价值
const capacity = 9; // 背包承受的最大重量
/**
 * 用回溯的房还是求解
 * @param {*} index 
 * @param {*} currentWeight 
 * @param {*} currentValue 
 * @param {*} list 
 * @returns 
 */
function knapsackBT(index=0, currentWeight=0, currentValue=0, list = []){
    //明确结束
    // 这里为什么用===，是因为只有小于等于capacity的才会进来，不会大于
    
    if(currentWeight === capacity || index === goods.length) {
        if(maxV < currentValue){
            maxV = currentValue;
        }
        console.log(maxV, list)
        return
    }
    let newList = [...list]
    // 每个物品都可能装，或者不装
    // 如果不装
    const next = index+1;
    knapsackBT(next, currentWeight, currentValue, newList);
    // 如果装
    if(goods[next]+currentWeight <= capacity) {
        newList.push(next)
        knapsackBT(next, currentWeight+goods[next], currentValue+values[next],newList);
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

/**
 * 用动态规划的思想，实现01背包价值最大化问题
 * @param {number []} goods , 物品重量的数组
 * @param {number []} values ， 每个物品价值的数组
 * @param {int} capacity ,总重量容量
 */
function knapsackDP(goods, values, capacity){
    const states = createTableArr(goods.length, capacity+1); // 多一个0位
    // 先特别处理一下第一个物品问题，不放，或者放
    // 不放
    states[0][0] = 0;
    // 放第一个物品
    states[0][goods[0]] = values[0]; // 将价值存入该状态位

    // 动态的根据上一个状态集合，推测下一个状态集合
    for(let i=1; i<goods.length; i++){
        // 处理每一个物品i
        // 都不放入，直接拷贝上一行数据即可
        for(j=0; j<=capacity; j++){
            if(states[i-1][j] >0 ){
                states[i][j] = states[i-1][j]; // 拷贝上一行有值的数据
            }
        }

        // 都放入
        for(j=0; j+goods[i]<=capacity; j++){
            const newValue = states[i-1][j] + values[i];
            if(newValue > states[i][j+goods[i]]){
                states[i][j+goods[i]] = newValue;
            }
        }
    }

    // 打印出价值，注意，最大价值一定在最后一行，但是并不一定在最后一行的最后一个元素，也就是不一定最重的情况下价值最高
    let maxValue = 0;
    let weight = 0;
    let maxRow = states[goods.length - 1];
    for(let i=0; i<maxRow.length; i++){
        if(maxRow [i] > maxValue){
            maxValue = maxRow [i];
            weight = i;
        }
    }
    return {
        maxValue,
        weight,
    }


}

function test1(){
    const goods = [2,2,4,6,3];
    const capacity = 9;
    const rst = knapsackBT();
    console.log(rst)
}
function test2(){
    const goods =   [2,2,4,6,3]; // 物品的重量
    const values = [3,4,8,9,6]; // 物品的价值
    const capacity = 9; // 背包承受的最大重量

    const rst = knapsackDP(goods,values,capacity);
    console.log(rst)
}
test1()
test2()
