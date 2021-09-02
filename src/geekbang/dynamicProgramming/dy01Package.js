// 动态规划的思路解决01背包基础版问题： https://time.geekbang.org/column/article/74788

function createTableArr(rows, columns){
    let arr = []
    //arr.push([1,0,1,1,1,0,1,0,1,0])
    for(let i=0; i<rows; i++){
        const row = [];
        for(j=0; j<columns; j++){
            row.push(0)
        }
        
        arr.push(row)
    }
    return arr;
}

function knapsack(goods, capacity){
    let states = createTableArr(goods.length, capacity+1)
    //console.log(states)
    states[0][0] = 1; // 第一行数据特殊处理
    if(goods[0] <= capacity){
        states[0][goods[0]] = 1;
    }
    // 动态规划状态转移
    for(let i=1; i<goods.length; i++){
        // 不把第i个放入背包中，遍历的方式将上一行的数据逐一拷贝到下一行，因为没有增加数据
        for(let j=0; j<=capacity; j++){
            if(states[i-1][j]===1){
                states[i][j] =states[i-1][j]
            };
        }
        // 把i放入背包中，注意循环的终止条件。
        // j是当前状态，也就是当前已经装了的重量。当前重量j 加上即将装的物品i的重量小于等于容量才能装
        for(let j=0; j + goods[i] <=capacity; j++){
            if(states[i-1][j]===1){
                states[i][j+goods[i]] =1;
            };
        }
        console.log(states[i], goods[i], i)
    }
    console.log(states);
    for(let i=capacity; i>=0; i--){
        if(states[goods.length - 1][i] === 1);
        return {
            maxValue: i,
            row: states[goods.length - 1]
        };
    }
    return 0;
}







/**
 * 根据行数、列数生成一个二维数组表，默认用0填充
 * @param {int} rows 
 * @param {int} columns 
 */
function createTableArr2(rows, columns, pad=0){
    const table = new Array(rows);
    for(let row = 0; row< rows; row++){
        const rowArr = new Array(columns);
        rowArr.fill(pad);
        table[row] = rowArr;
    }
    return table;    
}

function knapsack2(goods, capacity){
    const table = createTableArr2(goods.length, capacity+1); // 要留一个0空位，因此加1
    // 先处理一下第一个物品状态。
    // 第一个物品决策之后，会有两个状态：1，不放入：书包物品重量为0；2， 放入：书包物品重量变为2（该物品）重量变为2
    table[0][0]=1; // 1表示决策之后的状态，这里的值1不是重量，是表示是否有该状态。表示第0个位置不放入物品，重量还是0
    if(goods[0] <= capacity){ // 放入该物品
        table[0][goods[0]]=1;
    }
    // 遍历剩余物品，决策是否放入，（根据前一阶段状态）推导出当前阶段状态。
    for(let i=1; i<goods.length; i++){
        // 该物品不放入，也就是原封不动拷贝上一个物品的状态
        for(let j=0; j<=capacity; j++){
            if(table[i-1][j] === 1){ // 在之类如果不判断，全拷贝也可以。这样判断后更严谨一些
                table[i][j] = table[i-1][j]; // 拷贝上一行的状态
            }
        }

        // 该物品基于上一状态集合，都放入。注意for循环的终止条件，加入该物品后，不能超过容量限制
        for(let j=0; j + goods[i]<=capacity; j++){
            if(table[i-1][j] === 1) { // 如果之前有这个状态
                table[i][j + goods[i]] = 1; // 放入该物品后的状态位变为1
            }
        }
    }
    // 跟进所有物品决策完的情况，找到目标值。因为找最大的。肯定在最后一行，倒数着来。
    for(let i = capacity; i>=0; i--){ // 倒数着检查
        // 检查最后一行即可
        if(table[goods.length -1][i] === 1) {
            return {
                maxValue : i,
                row: table[goods.length -1],
                all:table
            }
        }
    }
    return 0;
}

// 
/**
 * 简洁版本的01背包问题。
 * 用一个一维数组来记录状态，因为0状态是不用的，可以简化掉。变的更加简洁。
 * 用数组的下表表示可能的状态集合
 * @param {int[]} goods 
 * @param {int} capacity 
 */
function knapsack3(goods, capacity){
    const states = new Array(capacity +1); // 多一个0位，因此加1
    const list = new Array(goods.length);
    states.fill(0);
    // 特殊处理一下第0个元素：不放、放
    states[0] = 1;
    if(goods[0] <= capacity){
        states[goods[0]] = 1; // 放入之后该状态位置为1，表示有该状态了。
        list[0] = 0;
    }
    // 遍历处理所有物品，根据之前的状态，决策后面的状态，注意这里的技巧
    for(let i=1; i< goods.length; i++){
        // 技巧： 内侧循环得用倒序遍历，不然会出现重复计算
        for(let j=capacity - goods[i]; j>=0; j--){
            states[j + goods[i]] = 1;
            list[i] = i;
        }
    }
    // 输出最大能装的量
    for(let i=states.length-1; i>=0; i--){
        if(states[i] === 1) {
            return {
                maxValue : i,
                list,
            }
        }
    }
    return 0;

}




function test1(){
    const goods = [2,2,4,6,3];
    const capacity = 9;
    const rst = knapsack(goods, capacity);
    console.log(rst)
}

function test2(){
    const goods = [2,2,4,6,3];
    const capacity = 9;
    const rst = knapsack2(goods, capacity);
    console.log(rst)
}

function test3(){
    const goods = [2,2,4,6,3];
    const capacity = 9;
    const rst = knapsack3(goods, capacity);
    console.log(rst)
}

test3()
