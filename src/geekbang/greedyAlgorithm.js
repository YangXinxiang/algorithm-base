// 练习贪心算法

// 1，装豆子问题： 有一个能装100KG的容器，用来装豆子，每种豆子的总重量和总价值都不一样。
// 如何装才能让装的豆子的价值最大
function storeDouzivalueMax(totalDouzi, totalKG = 100){
    // 1，按顺序拿到单价最高的豆子，然后去尽可能多装这些都子。按价格高低依次装豆子。
    // 先对价值排序
    const sortedKeys = Object.keys(totalDouzi).sort((a,b)=>{
        const priceA = totalDouzi[a].totalPrice/totalDouzi[a].totalKG;
        const priceAB = totalDouzi[b].totalPrice/totalDouzi[b].totalKG;
        if(priceA > priceAB){
            return 1
        }else {
            return -1;
        }
    })
    console.log(sortedKeys);
    // 因为是按照价值从小到大排列的，因此，从后算
    let restKG = totalKG;
    const result = [];
    for(let j=sortedKeys.length -1; j>=0; j--){
        const currentKey = sortedKeys[j];
        const currentDouzi = totalDouzi[currentKey];
        const currentSotreKG = restKG - currentDouzi.totalKG; // 尽可能全装
        // 如果全装装不下，装剩余的容量的豆子
        if(restKG > 0){
            let storeDouzi;
            if(currentSotreKG <=0 ){
                storeDouzi = {...currentDouzi, totalKG:restKG};
                restKG = 0;
            }else{
                // 否则该类型豆子全装
                storeDouzi = {...currentDouzi};
                restKG -= storeDouzi.totalKG;
            }
            result.push(storeDouzi)
        }        
    }
    return result;
}

// 分糖果问题 https://time.geekbang.org/column/article/73188
/**
 * 我们有 m 个糖果和 n 个孩子。我们现在要把糖果分给这些孩子吃，但是糖果少，孩子多（m
 */


function tes1(){
    const totalDouzi = {
        huangdou: {
            alias: "黄豆",
            totalKG: 100, // 总千克数
            totalPrice : 100,  // 总价
        },
        lvdou: {
            alias: "绿豆",
            totalKG: 30, // 总千克数
            totalPrice : 90,  // 总价
        },
        hongdou: {
            alias: "红豆",
            totalKG: 60, // 总千克数
            totalPrice : 120,  // 总价
        },
        heidou: {
            alias: "黑豆",
            totalKG: 20, // 总千克数
            totalPrice : 80,  // 总价
        },
        qingdou: {
            alias: "青豆",
            totalKG: 50, // 总千克数
            totalPrice : 75,  // 总价
        },
    }

    const rst = storeDouzivalueMax(totalDouzi);
    console.log(rst)
    
}

function divideGoods(candies, kids) {
    console.log(`divideGoods :: enter.`)
    console.log(candies)
    console.log(kids)
    // 先给期望最低的小朋友分
    candies = candies.sort((a,b)=>a.weight > b.weight ? 1 : -1);
    kids = kids.sort((a,b)=>a.wishWeight > b.wishWeight ? 1 : -1);
   
    const dividedMap = new Map(); // 已经分配了的数量，用空间换时间。
    const result = [];

    for(let i=0; i<candies.length; i++){
        const candy =  candies[i];
        for(let j = 0; j<kids.length; j++){
            const kid = kids[j];
            if(!dividedMap.get(kid.name)){
                if(candy.weight >= kid.wishWeight){
                    result.push([kid, candy]);
                    dividedMap.set(kid.name, true);
                    break;
                }
            }
        }

    }

    
    return result;
}

function tes2(){    
    function generateCandies(n){
        const result = [];
        for(let i=0; i<n; i++) {
            const weight = Math.ceil(Math.random()*10);
            const obj = {alias: `Candy_${i}`, weight}
            result .push(obj)
        }
        return result
    }
    function generateKids(n){
        const result = [];
        for(let i=0; i<n; i++) {
            const weight = Math.ceil(Math.random()*10);
            const obj = {name: `Kids_${i}`, wishWeight: weight}
            result .push(obj)
        }
        return result
    }
    const candies = generateCandies(5); // 创建10个糖果
    const kids = generateKids(8); //创建20个小朋友
    const rst = divideGoods(candies, kids)
    console.log(`divideGoods end`)
    console.log(rst)
}


function startTest(){
    tes2()

}

startTest()