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

function test1(){
    const goods = [2,2,4,6,3];
    const capacity = 9;
    const rst = knapsackBT();
    console.log(rst)
}

test1()
