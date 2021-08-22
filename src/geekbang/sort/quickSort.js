// 再次练习快排： 20201.08.22

function quickSort(arr){
    if(arr.length <=1){
        return arr;
    }
    const middleIndex = Math.floor(arr.length/2);
    const leftArr = [], rightArr = [], middle = [arr[middleIndex]];
    for(let i=0; i< arr.length; i++){
        if(i !== middleIndex ) {
            if(arr[i] < middle[0]){
                leftArr.push(arr[i])
            }else{
                rightArr.push(arr[i])
            }
        }
        
    }
    return quickSort(leftArr).concat(middle,quickSort(rightArr) )
}


function test1(){
    const arr = [5,9,1,3,10,21,7,9,6];
    console.log(quickSort(arr))
}

function startTest(){
    test1();
}

startTest()