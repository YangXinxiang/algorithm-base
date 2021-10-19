/**
 * 复习插入排序
 * 2021/10/19
 * 详细解释也可以参考： https://blog.csdn.net/yangxinxiang84/article/details/111830155
 */

const arr = [3,8,2,9,2]
/**
 * 插入排序，while循环版本
 * @param {*} arr 
 * @returns 
 */
function insertSort(arr) {
    if(arr.length <=1){
        return arr
    }
    let p = 1;
    while(p<arr.length) {
        let i = p-1
        let tobeSortEl = arr[p]
        for(; i>=0; i--){
            // 剪枝，如果已排序期间的最后一个 比 待排序期间的第一个小，那么此时不
            if(arr[i] > tobeSortEl){
                arr[i+1] = arr[i] // 做一次值拷贝，准备腾挪空间。
            } else {
                break
            }
        }
        arr[i+1] = tobeSortEl
        p++
    }
    console.log(`insertSort :: end, arr = ${arr}`)
    return arr
}

/**
 * 插入排序，双重循环版本。
 * @param {*} arr 
 */
function insertSort2(arr) {
    if(arr.length <=1){
        return arr
    }
    // 外层循环获取待排元素
    for(let i=1; i< arr.length; i++) {
        const sortingValue = arr[i]
        // 内存循环找到插入位置，并且腾挪出插入空间
        let j =i-1
        for(; j>=0; j--){
            if(arr[j] > sortingValue){
                arr[j+1] = arr[j] // 做一个冗余位置拷贝，准备腾挪空间
            }else{
                break
            }
        }
        // 此时的 j+1位置，就是本轮待排元素应该在的位置，直接赋值就好
        arr[j+1] = sortingValue
    }
    console.log(`insertSort2 :: end, arr = ${arr}`)
    return arr
}



function test1(){
    const arr = [5,9,1,3,10,21,7,9,6]; // 有序度低的数组    
    insertSort([...arr]) // 拷贝arr后再传进去，因为会修改arr
    insertSort2([...arr])
   
    console.log(`~~~~~~~~~~~~~~`)
    const arr2 = [1,3,6,5,7,9,9,10,21]; // 有序度高的数组
    insertSort([...arr2]) // 拷贝arr后再传进去，因为会修改arr
    insertSort2([...arr2])
}

function startTest(){
    test1();
}

startTest()