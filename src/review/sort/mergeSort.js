/**
 * 复习归并排序，可参考： https://blog.csdn.net/yangxinxiang84/article/details/120003981
 * 归并排序的核心是合并两个有序数组
 * 2021.10.19
 */

/**
 * 合并参数指定的两个有序数组，用双指针移动
 * @param {*} arr1 , 有序数组1
 * @param {*} arr2 ，有序数组2
 * @returns 
 */
function merge(arr1, arr2) {
    let i = 0, j = 0;
    const rst = []
    while(i< arr1.length && j < arr2.length) {
        if(arr1[i] < arr2[j]){
            rst.push(arr1[i]) 
            i++
        } else {
            rst.push(arr2[j]) 
            j++
        }
    }
    // 将剩余部分拷贝到数组
    if(i < arr1.length){
        return rst.concat(arr1.slice(i))
    }else{
        return rst.concat(arr2.slice(j))
    }
}

function mergeSort(arr) {
    // 只有一个元素的时候，该数组一定是有序的，因为一个元素没有什么顺序之说
    if(arr.length <=1){
        return arr
    }
    const middle = Math.floor(arr.length/2)
    const left = arr.slice(0, middle)
    const right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}

function test1(){
    const arr1 = [1,3,5,9]; 
    const arr2 = [6,7,9,10,21]
    const rst = merge(arr1, arr2)
    console.log(`test1 :: rst.len = ${rst.length}`)
    console.log(rst)   
}

function test2() {
    const arr = [5,9,1,3,10,21,7,9,6]; // 有序度低的数组  
    const rst = mergeSort(arr)
    console.log(`test2 :: rst.len = ${rst.length}`)
    console.log(rst)   
}

function startTest(){
    test2();
}

startTest()