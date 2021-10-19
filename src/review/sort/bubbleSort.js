/**
 * 算法复习，复习冒泡，敲一遍代码
 * 2021.10.19
 */

/**
 * 复习冒泡排序
 * 冒泡排序： 相邻的两个元素比较大小，判断并进行交互位置。
 * 外层循环控制要跑多少遍，内层循环每循环完一次（j = [0, arr.length -1)）排序完一个数
 * 2021.10.19
 * @param {*} arr 
 * @returns 
 */
function bubbleSort(arr) {
    let compareCount = 0
    let moveCount = 0
    console.log(`bubbleSort :: enter, compareCount = ${compareCount}, moveCount = ${moveCount}, arr = ${arr}`)
    for(let i=0; i<arr.length; i++){
        // 内层循环完成一轮，也就是j从0 递加到arr.length -1 一轮，表示有一个数冒泡到正确的位置了。
        for(let j=0; j< arr.length; j++) {
            // 如果前面的大，前后交换（因为是从小打到排序）
            compareCount++
            if(arr[j]> arr[j+1]){
                const temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
                moveCount++
            }
        }
    }
    console.log(`bubbleSort :: end, compareCount = ${compareCount}, moveCount = ${moveCount}, arr = ${arr}`)
    return arr
}
/**
 * 冒泡排序，基于上一步bubbleSort进一步优化：
 * 因为没跑完一轮，也就是外层i+1了，也就是内层j从0 递加到arr.length 一轮，表示有一个数冒泡到正确的位置了。
 * 也就是此时最后面i个元素已经是有序的，不需要再比较了，因此内层循环可以做一步优化为: j< arr.length -i
 * @param {*} arr 
 * @returns 
 */
function bubbleSort2(arr) {
    let compareCount = 0
    let moveCount = 0
    console.log(`bubbleSort2 :: enter, compareCount = ${compareCount}, moveCount = ${moveCount}, arr = ${arr}`)
    for(let i=0; i<arr.length; i++){
        // 内层循环完成一轮，有就是j从0 递加到arr.length -1 一轮，表示有一个数冒泡到正确的位置了。
        for(let j=0; j< arr.length -i; j++) { // i走完一轮，此时数组的倒数第i个元素就已经是有序的，不用再比较了
            // 如果前面的大，前后交换（因为是从小打到排序）
            compareCount++
            if(arr[j]> arr[j+1]){
                const temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
                moveCount++
            }
        }
    }
    console.log(`bubbleSort2 :: end, compareCount = ${compareCount}, moveCount = ${moveCount}, arr = ${arr}`)
    return arr
}

/**
 * 冒泡排序
 * 基于bubbleSort2进一步优化：如果内层循环跑完一轮，发现已经没有需要交换的元素了，说明此时整个数组已经是有序的了。可以直接退出整个方法了。
 * 这个对于有序度高的数组特别管用。
 * @param {*} arr 
 * @returns 
 */
function bubbleSort3(arr) {
    let compareCount = 0
    let moveCount = 0
    console.log(`bubbleSort3 :: enter, compareCount = ${compareCount}, moveCount = ${moveCount}, arr = ${arr}`)
    for(let i=0; i<arr.length; i++){
        // 内层循环完成一轮，有就是j从0 递加到arr.length -1 一轮，表示有一个数冒泡到正确的位置了。
        let hasMoved = false
        for(let j=0; j< arr.length -i; j++) { // i走完一轮，此时数组的倒数第i个元素就已经是有序的，不用再比较了
            // 如果前面的大，前后交换（因为是从小打到排序）
            compareCount++
            if(arr[j]> arr[j+1]){
                const temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
                moveCount++
                hasMoved = true
            }
        }
        // 如果本轮冒泡已经补需要交换元素了，可以直接退出后面的冒泡
        if(!hasMoved){
            break
        }
    }
    console.log(`bubbleSort3 :: end, compareCount = ${compareCount}, moveCount = ${moveCount}, arr = ${arr}`)
    return arr
}

function test1(){
    const arr = [5,9,1,3,10,21,7,9,6]; // 有序度低的数组    
    bubbleSort([...arr]) // 拷贝arr后再传进去，因为会修改arr
    bubbleSort2([...arr])
    bubbleSort3([...arr])
    console.log(`~~~~~~~~~~~~~~`)
    const arr2 = [1,3,6,5,7,9,9,10,21]; // 有序度高的数组
    bubbleSort([...arr2]) // 拷贝arr后再传进去，因为会修改arr
    bubbleSort2([...arr2])
    bubbleSort3([...arr2])
}

function startTest(){
    test1();
}

startTest()