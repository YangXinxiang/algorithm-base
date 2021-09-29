// 联系动态规划找零 https://time.geekbang.org/column/article/75702

/**
 * 问题： 有最小面额为11, 5, 1的三种人民币，用最少的张数找钱
 */
const {createTableArr} = require("../../util")
 const values = [11, 5, 1]; // 加入认为已经排好序
 const totalNeedGive = 17;
 function giveChangeBT(){
     const defaultCellValue = -2; // 这里用任意一个负数都行，-2是未了方便看结果状态，因为-1和1太像了。
     const states = createTableArr(values.length, totalNeedGive+1, defaultCellValue)
     // 特殊处理下第一行 
     states[0][totalNeedGive] = 0; // 不用该面值
     if(totalNeedGive >= values[0]){ // 使用该面值
        const currentSheet = Math.floor(totalNeedGive/values[0])
        const restNeed = totalNeedGive % values[0];
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
        for(let columnIndex = 1; columnIndex <= totalNeedGive; columnIndex++){
          if(states[rowIndex-1][columnIndex] >=0 ){
            const currentSheet = Math.floor(columnIndex/values[rowIndex])
            const newRest = columnIndex % values[rowIndex];
            const newTotal = states[rowIndex-1][columnIndex] + currentSheet
            const newState = states[rowIndex][newRest]
            if(newState === defaultCellValue){
                states[rowIndex][newRest] = newTotal; // 状态是记录张数
            }else{
                if(newState > newTotal){
                    states[rowIndex][newRest] = newTotal; // 状态是记录张数
                }
            }            
          }
        }        
     }
     // 如何知道哪种面值用了多少张呢？。。。这个倒推有点难啊
     console.log(states)
 }

 // giveChangeBT();


/**
 * 实现更详细的过程记录,输出最优解的时候，每种面值使用的张数，目前想到的是把状态值改为对象
 */
 function giveChangeBT2(){
    const defaultCellValue = -2; // 这里用任意一个负数都行，-2是未了方便看结果状态，因为-1和1太像了。
    const states = createTableArr(values.length, totalNeedGive+1, defaultCellValue)
    // 特殊处理下第一行 
    states[0][totalNeedGive] = {sum:0, route:[]}; // 不用该面值
    if(totalNeedGive >= values[0]){ // 使用该面值
       const currentSheet = Math.floor(totalNeedGive/values[0])
       const restNeed = totalNeedGive % values[0];
       states[0][restNeed] = {sum:currentSheet, route:[{coinValue: values[0], sheets: currentSheet}]} ; // 状态是记录张数
    }

    for(let rowIndex = 1; rowIndex < values.length; rowIndex++ ){
       // 如果不用这个面值，直接拷贝上一行
       for(let columnIndex = 0; columnIndex <= totalNeedGive; columnIndex++) {
         if(states[rowIndex-1][columnIndex] !== defaultCellValue ){
           states[rowIndex][columnIndex]  = states[rowIndex-1][columnIndex]; // 如果不用这个面值，直接拷贝上一行
         }
       }
       // 如果用
       for(let columnIndex = 1; columnIndex <= totalNeedGive; columnIndex++){
         if(states[rowIndex-1][columnIndex] !== defaultCellValue ){
           const currentSheet = Math.floor(columnIndex/values[rowIndex])
           const newRest = columnIndex % values[rowIndex];
           const newTotal = states[rowIndex-1][columnIndex].sum + currentSheet
           const newState = states[rowIndex][newRest]
           const newRoute = [...states[rowIndex-1][columnIndex].route]
           newRoute.push({coinValue: values[rowIndex], sheets: currentSheet})

           if(newState === defaultCellValue){
               // states[rowIndex][newRest] = newTotal; // 状态是记录张数
               states[rowIndex][newRest] = {sum:newTotal, route:newRoute}; // 状态是记录张数
           }else{
               if(newState.sum > newTotal){
                   const newRoute = [...newState.route];
                   newRoute.push({coinValue: values[rowIndex], sheets: currentSheet})
                   states[rowIndex][newRest] =  {sum:newTotal, route:newRoute} ; // 状态是记录张数
               }
           }            
         }
       }        
    }
    // console.log(states)
    console.log(states[values.length-1][0])
}
giveChangeBT2()