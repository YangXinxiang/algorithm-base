/**
 * 练习贪心和动态规划
 */

/**
 * 问题： 有最小面额为11, 5, 1的三种人民币，用最少的张数找钱
 */
const values = [11, 5, 1];
const totalNeedGive = 15;
// 贪心算法实现
function giveChangeTX(rest=totalNeedGive, index=0, sheets=0, routes=[]){
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
    return giveChangeTX(newRest, index+1, maxSheets+sheets, newRotes)
}

// 用回溯算法暴力搜索
let minSheets = Infinity; // 记录最小找零张数
function giveChangeBT(rest=totalNeedGive, index=0, sheets=0, routes=[]){    
    if(rest ===0){
        console.log(`giveChangeBT :: end, rest = ${rest}, index = ${index}, sheets = ${sheets}`)
        console.log(routes)
        if(sheets >0 && minSheets > sheets){
            minSheets = sheets;
        }
        return sheets;
    }
    // 可用币种用完了，该情况就不要了。
    if(index<values.length){
        // 不用该面值的人民币   
        const newRotes = [...routes]
        giveChangeBT(rest, index+1, sheets, newRotes)

        // 用该面值的人民币   
        const maxSheets = Math.floor(rest/values[index]);
        const newRest = rest%values[index];
        // 辅助看具体细节
        const route  = {
            [values[index]] : maxSheets,
        }
        newRotes.push(route);
        giveChangeBT(newRest, index+1, sheets+maxSheets,  newRotes)   
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
function getRest(value, rest){
    const sheets = Math.floor(rest/value);
    const newRest = rest%values[index];
    return {
        rest: newRest,
        sheets,
    }
}

// 用动态规划解决
function giveChangeDP(rest=totalNeedGive, totalNeedGive = totalNeedGive){
    const states = createTableArr(values.length, totalNeedGive, -1);
    // 首元素
    const first = 
    // 不用第一个面值
    states[0]
}



function test1(){
    giveChangeTX(); // 用贪心算法测试
    console.log(`will use back tracking~~`)
    giveChangeBT()
    console.log(`minSheets = ${minSheets}`)
}



function startTest(){
    test1()
}
startTest()