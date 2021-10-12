// 需要在单独的文件中运行

/**
 * 工具方法，创建一个表格（二维数组）
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
 * 求解问题： 有最小面额为11, 5, 1的三种人民币，用最少的张数付款
 * @param { int[] } values , 人民币面值数组
 * @param {int} totalNeedGive ， 需要付款数量
 * @returns {int} minCoinCount, 最少使用的钱的张数
 */

 function giveChangeDP(values, totalNeedGive){
     const defaultCellValue = -2; // 这里用任意一个负数都行，-2是未了方便看结果状态，因为-1和1太像了。
     const states = createTableArr(values.length, totalNeedGive+1, defaultCellValue); // totalNeedGive+1 是因为有一个0列
     // 特殊处理下第一行 
     states[0][totalNeedGive] = 0; // 不用该面值
     if(totalNeedGive >= values[0]){ // 使用该面值
        const currentSheet = Math.floor(totalNeedGive/values[0])
        const restNeed = totalNeedGive % values[0];
        states[0][restNeed] = currentSheet; // 状态是记录张数
     }

     for(let rowIndex = 1; rowIndex < values.length; rowIndex++ ){
        // 如果不用这个面值，直接拷贝上一行。注： columnIndex就是剩余要付款
        for(let columnIndex = 0; columnIndex <= totalNeedGive; columnIndex++){
          if(states[rowIndex-1][columnIndex] >=0 ){
            states[rowIndex][columnIndex]  = states[rowIndex-1][columnIndex]; // 如果不用这个面值，直接拷贝上一行
          }
        }
        // 如果用该面值的钱。注： columnIndex就是剩余要付款
        for(let columnIndex = 1; columnIndex <= totalNeedGive; columnIndex++){
          if(states[rowIndex-1][columnIndex] >=0 ){
            const currentSheet = Math.floor(columnIndex/values[rowIndex])
            const newRest = columnIndex % values[rowIndex];
            const total = states[rowIndex-1][columnIndex] + currentSheet // 新的总张数
            const state = states[rowIndex][newRest] // 该状态下原来人民币的张数
            if(state === defaultCellValue){ // 该单元格还没使用过
                states[rowIndex][newRest] = total; // 状态是记录张数
            }else{
                if(state > total){ // 如果该单元格已经有用过，保留小的
                    states[rowIndex][newRest] = total; // 状态是记录张数
                }
            }            
          }
        }        
     }
     const minCoinCount = states[states.length - 1][0];
     console.log(`giveChangeDP :: end, minCoinCount = ${minCoinCount}, states = `)
     // 如何知道哪种面值用了多少张呢？。。。这个倒推有点难啊
     console.log(states)
     return minCoinCount;
 }

 const values = [11, 5, 1]; // 加入认为已经排好序
 const totalNeedGive = 15;
giveChangeDP(values, totalNeedGive);



/**
 * 有最小面额为11, 5, 1的三种人民币，用最少的张数付款，返回最小张数和具体付款详情，每种面值用几张。
 * @param { int[] } values , 人民币面值数组
 * @param {int} totalNeedGive ， 需要付款数量
 * @returns {Object} result, 最少使用的钱的张数和详细记录
 */
 function giveChangeDP2(values, totalNeedGive){
    const defaultCellValue = -2; // 这里用任意一个负数都行，-2是未了方便看结果状态，因为-1和1太像了。
    const states = createTableArr(values.length, totalNeedGive+1, defaultCellValue) // 需要自行拷贝上面的公共方法
    // 特殊处理下第一行 
    states[0][totalNeedGive] = {sum:0, route:[]}; // 不用该面值
    if(totalNeedGive >= values[0]){ // 使用该面值
       const currentSheet = Math.floor(totalNeedGive/values[0])
       const restNeed = totalNeedGive % values[0];
       states[0][restNeed] = {sum:currentSheet, route:[{coinValue: values[0], sheets: currentSheet}]} ; // 状态是记录张数
    }

    for(let rowIndex = 1; rowIndex < values.length; rowIndex++ ){
       // 如果不用这个面值，直接拷贝上一行。注： columnIndex就是剩余要付款
       for(let columnIndex = 0; columnIndex <= totalNeedGive; columnIndex++) {
         if(states[rowIndex-1][columnIndex] !== defaultCellValue ){
           states[rowIndex][columnIndex]  = states[rowIndex-1][columnIndex]; // 如果不用这个面值，直接拷贝上一行
           console.log(rowIndex, columnIndex, states[rowIndex][columnIndex])
         }
         
       }
       // 如果用该面值的钱。注： columnIndex就是剩余要付款
       for(let columnIndex = 1; columnIndex <= totalNeedGive; columnIndex++){
         if(states[rowIndex-1][columnIndex] !== defaultCellValue ){
           const currentSheet = Math.floor(columnIndex/values[rowIndex])
           const newRest = columnIndex % values[rowIndex];
           const total = states[rowIndex-1][columnIndex].sum + currentSheet // 新的总张数
           const state = states[rowIndex][newRest]
           const newRoute = [...states[rowIndex-1][columnIndex].route]
           newRoute.push({coinValue: values[rowIndex], sheets: currentSheet})

           if(state === defaultCellValue){ // 该状态下原来人民币的张数
               states[rowIndex][newRest] = {sum:total, route:newRoute}; // 状态是记录张数和路径
           }else{
               if(state.sum > total){
                   const newRoute = [...state.route];
                   newRoute.push({coinValue: values[rowIndex], sheets: currentSheet})
                   states[rowIndex][newRest] =  {sum:total, route:newRoute} ; // 状态是记录张数和路径
               }
           }            
         }
       }        
    }
    // console.log(states)
    const result = states[values.length-1][0];
    console.log(`giveChangeDP2 :: end, result = `)
    console.log(result)
    return result
}
giveChangeDP2( [11, 5, 1], 15);



/**
 * 用回溯算法暴力搜索最优解
 * @param { int[] } values , 人民币面值数组
 * @param {int} rest ， 需要付款剩余钱数
 * @param {*} index， 当前使用的人民币面值所在数组索引
 * @param {*} sheets , 当前阶段使用了人民币的总张数
 * @param {*} routes , 详细过程，记录了到达当前阶段每种面值的钱，各用了多少张。
 * @returns 
 */
 let minSheets = Infinity; // 记录最小找零张数
 let minRoutes;
 function giveChangeBT(values, rest, index=0, sheets=0, routes=[]){  
     if(rest ===0){
         console.log(`giveChangeBT :: end, rest = ${rest}, index = ${index}, sheets = ${sheets}`)
         console.log(routes)
         if(sheets >0 && minSheets > sheets){
             minSheets = sheets;
             minRoutes = routes;
         }
         return sheets;
     }
     // 可用币种用完了，该情况就不要了。
     if(index<values.length){
         // 不用该面值的人民币   
         const newRotes = [...routes] // 这一步很重要，详细信息要复制出来
         giveChangeBT(values, rest, index+1, sheets, newRotes)
 
         // 用该面值的人民币   
         const maxSheets = Math.floor(rest/values[index]);
         const newRest = rest%values[index];
         // 辅助看具体细节
         const route  = {
             [values[index]] : maxSheets,
         }
         newRotes.push(route);
         giveChangeBT(values, newRest, index+1, sheets+maxSheets,  newRotes)   
     }     
 }
 
 
 giveChangeBT( [11, 5, 1], 15)
 console.log(`call giveChangeBT end, rst = `, minSheets, minRoutes) // 3 [ { '5': 3 } ]



 /**
 * 贪心算法实现
 * @param { int[] } values , 人民币面值数组，这里认为是从大到小排好序的。
 * @param {int} rest ， 需要付款剩余钱数
 * @param {*} index， 当前使用的人民币面值所在数组索引
 * @param {*} sheets , 当前阶段使用了人民币的总张数
 * @param {*} routes , 详细过程，记录了到达当前阶段每种面值的钱，各用了多少张。
 * @returns 
 */
function giveChangeTX(values, rest, index=0, sheets=0, routes=[]){
    if(rest ===0 || index >= values.length){
        console.log(`giveChangeTX :: end, rest = ${rest}, index = ${index}, sheets = ${sheets}`)
        console.log(routes)
        return sheets;
    }
    // 用贪心的思想，先找最大面额的，因为面额最大，需要的张数会“更少”
    const maxSheets = Math.floor(rest/values[index]);
    const newRest = rest%values[index];
    // 辅助看具体细节
    const route  = {
        [values[index]] : maxSheets,
    }
    const newRotes = [...routes, route];    
    return giveChangeTX(values, newRest, index+1, maxSheets+sheets, newRotes)
  }
  
  giveChangeTX([11, 5, 1], 15);
  
  // 输出
  // giveChangeTX :: end, rest = 0, index = 3, sheets = 5
  // [ { '11': 1 }, { '5': 0 }, { '1': 4 } ]

  // 川哥版本的动态规划找零，精炼！
/**
 * 我们采用自下而上的方式进行思考
 * 定义F(i)为组成金额 i 所需最少的硬币数量。 初始化的时候，F(i)初始化为一个很大的数（大于需要找零的钱即可）
 * 假设在计算F(i)之前，我们已经计算出F(0) 到F(i-1)的答案。则F(i)对应的状态转移方程应为：
 * F(i) = min( F(i), F(i-Cj) + 1 );  j=0->n-1; n=可用硬币面值类型数
 * 也就是，第 i 块钱的时候，要分别尝试去使用每一个可用面值的钱一次（i-coin），此时使用过一次硬币，数量要+1，因此状态转移方程如上所示。
 * 其中Cj代表的是第 j 枚硬币的面值，即我们枚举最后一枚硬币面额是Cj
 * 那么需要从 i-Cj 这个金额的状态 F(i-Cj) 转移过来
 * 再算上枚举的这枚硬币数量1的贡献
 * 由于要硬币数量最少，所以 F(i) 为前面能转移过来的状态的最小值加上枚举的硬币数量 1 
 * @param {*} coins 
 * @param {*} amount 
 * @returns 
 */
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
      // 只有当前的零钱比当前的总额 i 小，才有可能被加上，超过了直接下一个
      if(coin <= i){
        // 当前 F(i)的局部最优解，一定是当前 F(i) 和F(i - 当前面值) + 1里面比较小的一个
        dp[i] = Math.min(dp[i], dp[i-coin] + 1)
      }
    }
  }
  // 有可能凑不足需要的钱，返回 -1
  return dp[amount] > amount ? -1 : dp[amount] ;
}
// 测试
const amount = 10
const coins = [11, 6, 3]
const rst = coin2Change(coins, amount);
console.log(`call coin2Change end, rst = ${rst}`);
// console.log(rst)

function coin2Change3(coins, amount){
  const dp = new Array(amount+1);
  dp.fill(amount + 1); // 默认填充一个很大的数，比要找的钱数大。
  dp[0] = 0;
  for(let i=1; i<=amount; i++){
    // 每一次要凑的钱，都尝试用一遍所有可用面值，最后选最小的
    for(const coin of coins){
      if(i >= coin) {
        dp[i] = Math.min(dp[i], dp[i-coin] + 1);
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
}

const rst4 = coin2Change3(coins, amount);
console.log(`coin2Change3~~~~~~~`);
console.log(rst4)

/**
 * 递归动态规划实现找零需求
 * @param {*} coins , 可用的币种数组，每种币种梳理无限制。
 * @param {*} amount , 需要凑足的钱数
 * @returns totalMin, -1 或者凑足需要找零 amount 所需的最少硬币数
 */
function coin2ChangeR(coins, amount){
  // 再包装一下，主要是处理不满足条件的场景。同时做备忘录缓存
  const cache = new Map(); 
  // 递归动态规划实现找零 
  function change(coins, amount){
    if(amount === 0){
      return 0;
    }
    // 备忘录缓存优化
    if(cache.get(amount)){
      return cache.get(amount);
    }
    const counts =[];
    // 对当前的amount, 每一个都尝试使用一下所有面值币种硬币，然后取最小值
    for(const coin of coins){
      if(coin <= amount) {
        const count = change(coins, amount - coin) +1;
        counts.push(count)
      }
    } 
    const minCount = Math.min(...counts);
    cache.set(amount, minCount)
    return minCount
  }
  const totalMin = change(coins, amount)
  return totalMin > amount ? -1 : totalMin  
}

const rstR = coin2ChangeR(coins, amount);
console.log(`coin2ChangeR :: call end, rstR = ${rstR}`);
console.log(rstR)

