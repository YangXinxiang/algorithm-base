// 联系动态规划找零 https://time.geekbang.org/column/article/75702

/**
 * 问题： 有最小面额为11, 5, 1的三种人民币，用最少的张数找钱
 */
 const values = [11, 5, 1]; // 加入认为已经排好序
 const totalNeedGive = 15;
function getMinCountsTX(rest = totalNeedGive, count=0){
    if(rest===0){
        console.log(`getMinCountsTX :: end, count = ${count}`)
        return count;
    }
    let useValue=0;
    for(let value of values){
        if(value <= rest ){
            useValue = value;
            break;
        }
    }
    const nextRest = rest%useValue;
    const currentSheet = Math.floor(rest/useValue);
    console.log(`getMinCountsTX :: useValue = ${useValue}, nextRest = ${nextRest}, currentSheet = ${currentSheet}`)
    getMinCountsTX(nextRest, currentSheet+count)
}

let minSheets = Infinity;
function getMinCountsBT(rest = totalNeedGive, sheetCount=0, index=0){
    if(rest ===0 || index >= values.length){
        console.log(`getMinCountsBT :: end, sheetCount = ${sheetCount}, rest = ${rest}`);
        if(rest ===0 ){
            if(sheetCount < minSheets){
                minSheets = sheetCount;
            }
        }
        return sheetCount;
    }
    // 不用
    getMinCountsBT(rest, sheetCount, index+1);

    // 使用
    const useValue = values[index];
    if(useValue <= rest){
        const nextRest = rest%useValue;
        const currentSheet = Math.floor(rest/useValue); 
        getMinCountsBT(nextRest, currentSheet + sheetCount, index+1)
    }else{
        // getMinCountsBT(rest, sheetCount, index+1);
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
function giveChangeDP(){
    console.log(`giveChangeDP :: enter.`)
    const columns = totalNeedGive+1
    const status = createTableArr(values.length, columns, -1);
    let rest = totalNeedGive;
    console.log(status);
    // 先处理第0个
    // 不用
    status[0][rest]=0;

    
    if(rest >= values[0]){
        const sheets = Math.floor(totalNeedGive/values[0])        
        rest = totalNeedGive % values[0];
        status[0][rest]=sheets;
    }
    console.log(status);

    for(let index = 1; index< values.length; index++){
        // 不用，直接将上一行修改过的数据拷贝下来即可
        for(let column =0; column< columns; column++){
            if(status[index-1][column]>=0){
                status[index][column] = status[index-1][column]
            }
        }

        // 用该面值的钱

        for(let column =0; column< columns; column++){
            if(rest >= values[index]){
                const sheets = Math.floor(rest/values[index])        
                rest = rest % values[index];
                status[index][rest]=sheets;
            }
        }
        
    
    }
    console.log(`giveChangeDP :: calculate end.`)
    console.log(status);
}
function test1(){
    const rst = getMinCountsTX();
    console.log(`test1 ::  rst = ${rst}`)
}

function test2(){
    getMinCountsBT()
    console.log(`test2 :: getMinCountsBT end, minSheets = ${minSheets}`)
}
function test3(){
    giveChangeDP()
    console.log(`test2 :: giveChangeDP end`)
}

function startTest(){
    test3()
}

startTest();