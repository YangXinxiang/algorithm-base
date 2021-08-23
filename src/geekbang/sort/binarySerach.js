// https://time.geekbang.org/column/article/42520
/**
 * 二分查找高效的在一个有序的数组中查找目标数据位置
 * @param {*} arr 
 * @param {*} target 
 * @returns 
 */
function binarySearch(arr, target){
    let low = 0, high = arr.length-1;
    // 找到中间位置
    let middle = Math.floor(low + (high - low)/2);
    // let middle = Math.floor((low+high)/2); // 这种算法有溢出风险，但是基本也不会遇到，知道就好。
    for(; low<=high; ){
        if(arr[middle] === target){
            return middle;
        }
        if(arr[middle] > target){
            high = middle -1;
        }else{
            low = middle +1;
        }
        middle = Math.floor(low + (high - low)/2);
    }
    return -1;
}

/**
 * 通过wihle循环查找。
 * @param {*} arr 
 * @param {*} target 
 * @returns 
 */
function binarySearch2(arr, target){
    let low = 0, high = arr.length-1;
    let mid =0;
    while(low <= high){
        mid = Math.floor(low + (high -low)/2);
        if(arr[mid] === target){
            return mid;
        }
        if(arr[mid] > target){
            high = mid -1;
        }else{
            low = mid +1;
        }
    }
    return -1;
}

// 通过递归实现
function binarySearch3(arr, target, low=0, high = arr.length-1){
    const mid = Math.floor(low + (high-low)/2);
    if(low > high){
        return -1
    }
    if(arr[mid] === target){
        return mid;
    }else{
        if(arr[mid] > target){
            high = mid -1;
        }else{
            low = mid +1;
        }
        return binarySearch3(arr, target, low, high);
    }
}

function test1(){
    const arr = [2,5,8,12,35,67,80,89,98,156,245,674,876,900];
    console.log(binarySearch(arr, 67));
    console.log(binarySearch(arr, 876));
    console.log(binarySearch(arr, 7));
    console.log(`~~~~~~~~~~~~~`)
    console.log(binarySearch2(arr, 67));
    console.log(binarySearch2(arr, 876));
    console.log(binarySearch2(arr, 7));
    console.log(`~~~~~~~~~~~~~`)
    console.log(binarySearch3(arr, 67));
    console.log(binarySearch3(arr, 876));
    console.log(binarySearch3(arr, 7));
}
test1()