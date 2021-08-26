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

// 在有序数组中查找第一个值等于给定值的元素下标
function binarySearchFirstIndex(arr, target) {
    let low = 0, high = arr.length-1;
    let mid = 0;
    while(low <= high){
        mid = Math.floor(low + (high-low)/2);
        if(arr[mid]===target){
            if(mid ===0 || arr[mid-1] !==target){
                return mid;
            }else{
                high = mid -1; // 这是关键，如果找到相同的值了，前面还有相同的，就继续往前（小的位置）找
            }
        }else if(arr[mid]>target){
            high = mid -1;
        }else{
            low = mid +1;
        }
    }
    return -1;
}

// 在有序数组中查找最后一个值等于给定值的元素下标
function binarySearchLastIndex(arr, target) {
    let low = 0, high = arr.length-1;
    let arrLen = arr.length;
    let mid = 0;
    while(low <= high){
        mid = Math.floor(low + (high-low)/2);
        if(arr[mid]===target){
            if(mid === arrLen-1 || arr[mid+1] !==target){
                return mid;
            }else{
                low = mid +1; // 这是关键，如果找到相同的值了，前面还有相同的，就继续往后（大的位置）找
            }
        }else if(arr[mid]>target){
            high = mid -1;
        }else{
            low = mid +1;
        }
    }
    return -1;
}

// 在有序数组中查找第一个值大于等于给定值的小标
function binarySearchFirstBigThen(arr, target) {
    let low = 0, high = arr.length-1;
    let arrLen = arr.length;
    let mid = 0;
    while(low <= high){
        mid = Math.floor(low + (high-low)/2);
        if(arr[mid] >= target){
            if(mid ===0 || arr[mid-1]<target){
                return mid;
            }else{
                high = mid - 1;
            }
        }else{
            low = mid +1;
        }
    }
    return -1;
}

// “在有序数组中，查找最后一个小于等于某个给定值的元素
function binarySearchLastSmallThen(arr, target){
    let low = 0, high = arr.length - 1;
    let mid = 0;
    while(low <= high){
        mid = Math.floor(low + (high-low)/2);
        if(arr[mid] <= target){
            // 如果满足条件的已经是最后一个元素，或者下一个元素已经比目标元素大，说明找到的就是最后一个元素
            if(mid ===arr.length-1 || arr[mid +1] > target){
                return mid
            }
            low = mid +1; 
        }else{
            high = mid -1;
        }
    }

    return -1;
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
function test2(){
    const arr = [2,5,8,12,12,35,67,80,80,80,89,98,156,245,674,876,900];
    console.log(binarySearchFirstIndex(arr, 67));
    console.log(binarySearchFirstIndex(arr, 80));
    console.log(binarySearchFirstIndex(arr, 12));
    console.log(binarySearchFirstIndex(arr, 5));
    console.log(binarySearchFirstIndex(arr, 15));
    console.log(`~~~~~~~~~~~~~`)
    console.log(binarySearchLastIndex(arr, 67));
    console.log(binarySearchLastIndex(arr, 80));
    console.log(binarySearchLastIndex(arr, 12));
    console.log(binarySearchLastIndex(arr, 5));
    console.log(binarySearchLastIndex(arr, 15));
}

function test3(){
    const arr = [2,5,8,12,12,35,67,80,80,80,89,98,156,245,674,876,900];
    console.log(binarySearchFirstBigThen(arr, 7));
    console.log(binarySearchFirstBigThen(arr, 80));
    console.log(binarySearchFirstBigThen(arr, 6));
    console.log(binarySearchFirstBigThen(arr, 5));
    console.log(binarySearchFirstBigThen(arr, 15));
    
}

function test4(){
    const arr = [2,5,8,12,12,35,67,80,80,80,89,98,156,245,674,876,900];
    console.log(binarySearchLastSmallThen(arr, 7)); // 2
    console.log(binarySearchLastSmallThen(arr, 80)); //9
    console.log(binarySearchLastSmallThen(arr, 6)); // 2
    console.log(binarySearchLastSmallThen(arr, 5)); // 1
    console.log(binarySearchLastSmallThen(arr, 15)); //4
    
}
test4()