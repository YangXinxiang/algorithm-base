// 联系动态规划找零 https://time.geekbang.org/column/article/75702

/**
 * 问题： 有最小面额为11, 5, 1的三种人民币，用最少的张数找钱
 */
const {createTableArr} = require("../../util")
 const values = [11, 5, 1]; // 加入认为已经排好序
 const totalNeedGive = 15;
 function giveChangeDP(){
     const states = createTableArr(values.length, totalNeedGive+1, -1)
     // 特殊处理下第一行
     let restNeed = totalNeedGive
     states[0][restNeed] = 0;
     if(restNeed >= values[0]){
        const currentSheet = Math.floor(restNeed/values[0])
        restNeed = restNeed % values[0];
        states[0][restNeed] = currentSheet; // 状态是记录张数
     }

     for(let rowIndex = 1; rowIndex < values.length; rowIndex++ ){
        // 如果不用这个面值，直接拷贝上一行
        for(let columnIndex = 0; columnIndex <= totalNeedGive; columnIndex++){
          if(states[rowIndex-1][columnIndex] >=0 ){
            states[rowIndex][columnIndex]  = states[rowIndex-1][columnIndex]; // 如果不用这个面值，直接拷贝上一行
          }
        }
        // 如果用
        for(let columnIndex = 0; columnIndex <= totalNeedGive; columnIndex++){
          if(states[rowIndex-1][columnIndex] >=0 ){
            const currentSheet = Math.floor(columnIndex/values[rowIndex])
            const currentRest = columnIndex % values[rowIndex];
            const currentTotal = states[rowIndex-1][columnIndex] + currentSheet
            const currentState = states[rowIndex][currentRest]
            if(columnIndex ===0){
              if(currentState ===-1 || (currentTotal < states[rowIndex][currentRest])){
                states[rowIndex][currentRest] = currentTotal; // 状态是记录张数
              } 
            }else{
              states[rowIndex][currentRest] = currentTotal; // 状态是记录张数
            }
                       

          }
        }
        
     }

     console.log(states)

 }


 
 

 giveChangeDP();

 // 川哥版本的动态规划找零，精炼！
function coin2Change(coins = [11, 5, 1], amount = 15) {
  // 最大值假设就是要求和的数量加上1，这个一定是最大的，再多的硬币也就是1分的全部构成
  const max = amount +1;
  // 初始化dp数组，初始化到大小为金额大小再加1，因为dp的第一个元素是0
  const dp = new Array(amount +1)
  dp.fill(max)
  dp[0] = 0;

  // 外层循环就是构建F(0)到F(i)的过程
  for(let i = 1; i<=amount; i++){
    // 内层循环是遍历整个零钱数组的过程
    for(const coin of coins) {
      if(coin <= i){
        dp[i] = Math.min(dp[i], dp[i-coin] + 1)
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount] ;
}

const rst2 = coin2Change([11, 5, 1], 4);
console.log(`~~~~~~~`);
console.log(rst2)