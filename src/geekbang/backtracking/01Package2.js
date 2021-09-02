// https://time.geekbang.org/column/article/74788
// let maxW = 0;
// const goods = [2,8,7,6,5] // 每个物品的重量
// const capacity = 13;
 
// function store(index=0, currentWeight=0, list=[]){
//     if(currentWeight===capacity || index >=goods.length){
//         if(currentWeight>maxW){
//             maxW = currentWeight
//             console.log(`store,currentWeight = ${currentWeight}, maxW = ${maxW}, index = ${index}, list = ${list}`)
//         }
        
//         return;
//     }
//     let newList = [...list]
//     store(index+1, currentWeight, newList);
//     if(currentWeight+goods[index] <= capacity){
//         newList.push(index)
//         store(index+1, currentWeight+goods[index], newList);
//     }
// }
// store()














let maxW = 0;
const goods = [2,2,4,6,3] // 每个物品的重量
const capacity = 9;
 

function store01(index = 0, currentWeight=0, list = []){
    if(currentWeight === capacity || index >= goods.length){
        if(currentWeight > maxW){
            maxW = currentWeight;
        }
        console.log(`store01 :: maxW = ${maxW},currentWeight = ${currentWeight}, list = ${list}`);
        return currentWeight
    }
    const newList = [...list]
    store01(index+1, currentWeight, newList); // 不装该index的物品
    // 如果加上当前物品的重量，不超过总可以承受的重量。
    if(currentWeight+goods[index] <=capacity ) {
        newList.push(index);
        store01(index+1, currentWeight+goods[index], newList); // 装该Index物品
    }
    

}

store01()










