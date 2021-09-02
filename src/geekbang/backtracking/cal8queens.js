const maxSideCont = 8;
const result = []
function cal8queens(row=0){
    if(row>=8){
        //console.log(result)
        printResult(result);
        return result;
    }
    
    for(let column=0; column<maxSideCont; ++column){
        if(isOK(row, column)){
            result[row] = column;
            //console.log(row,"=====",result)
            cal8queens(row+1)
           // break;
        }
    }
}

function isOK(row, column){
    // 最左上角，默认是可以放的
    // if(row ===0 && column===0){
    //     return true;
    // }
    // 逐一往上一行检查是否有满足的
    let leftup = column-1; // 当前单元格的左一列
    let rightup = column +1; // // 当前单元格的右一列
    for(let i=row-1; i>=0; --i) {
        // 检查正上方是否有棋子
        if(result[i]===column){
            return false;
        }
        // 检查左上角
        if(leftup>=0){
            if(result[i]===leftup){
                return false;
            }
        }
        
        //检查右上角
        if(rightup < maxSideCont){
            if(result[i]===rightup){
                return false;
            }
        }
        
        --leftup;
        ++rightup;
    }
    return true;
}

function printResult(result){
    console.log(result);
    for(let i=0; i< maxSideCont; i++){
        let rowStr = "";
        for(let j=0; j< maxSideCont; j++){
            if(j===result[i]){
                rowStr +=` ${j}`;
            }else{
                rowStr +=" *";
            }
            
        }
        console.log(rowStr);
    }
}



const max = 8
const rstArr = [];
function cal8queens2(row=0){
    if(row >= 8){
        printResult(rstArr);
        return
    }
    for(let column =0; column<max; column++){
        if(isOK2(row, column)) {
            rstArr[row] = column;
            cal8queens2(row+1)
            //break;
        }
    }
}


function isOK2(row, column){
    let leftup = column-1, rightup = column+1;
    for(let i = row-1; i >=0; i--){
        // 检查正上方
        if(rstArr[i]===column){
            return false;
        }

        // 检查左上角
        if(leftup>=0){
            if(rstArr[i]===leftup){
                return false;
            }
        }

        // 检查右上角
        if(rightup <=max){
            if(rstArr[i]===rightup){
                return false;
            }
        }

        leftup--;
        rightup++;
    }
    return true;
}


function test(){
    // const arr = [8,4,5,7,9, 1,3,6,2]
    //const arr = [1,2,3,4,5,6,7,8]
    const arr = [8,7,9,22,6,5,4,3,11,2,1]
    //cal8queens()
    cal8queens2()
    // printResult([7, 3, 0, 2, 5, 1, 6, 4])
}

function startTest(){
    test();
}
startTest()