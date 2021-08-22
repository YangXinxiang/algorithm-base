function bubbleSort(arr){
    for(let i=0; i< arr.length; i++) {
        let hasBubble = false;
        for(let j=0; j<arr.length-i-1; j++){
            if(arr[j]> arr[j+1]){
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                hasBubble = true;
            }
        }
        // 如果外层循环这一轮已经没有数据交换，说明数据已经有序了，不用再冒泡了。
        if(!hasBubble){
            break;
        }
    }

    return arr;
}


function test1(){
    const arr = [5,9,1,3,10,21,7,9,6];
    console.log(bubbleSort(arr))
}

function startTest(){
    test1();
}

startTest()