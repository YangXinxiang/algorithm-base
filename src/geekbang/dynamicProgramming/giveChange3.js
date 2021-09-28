// 联系动态规划找零 https://time.geekbang.org/column/article/75702

/**
 * 问题： 有最小面额为11, 5, 1的三种人民币，用最少的张数找钱
 */
const {createTableArr} = require("../../util")
 const values = [11, 5, 1]; // 加入认为已经排好序
 const totalNeedGive = 15;
 function giveChangeBT(){
     const states = createTableArr(values.length, totalNeedGive+1, -1)
     // 特殊处理下第一行
     let restNeed = totalNeedGive
     states[0][restNeed] = 0;
     if(restNeed >= values[0]){
        const currentSheet = Math.floor(restNeed/values[0])
       // restNeed = 
     }

 }

 

 giveChangeBT();