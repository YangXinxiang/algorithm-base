/**
 * 练习快排，实现原理可参考： https://blog.csdn.net/yangxinxiang84/article/details/105896269
 * 2021.10.19
 */
// const arr = [8,5,12,11,6,4,5,19,22]
function quickSort(arr) {
    console.log(`quickSort :: enter, arr = ${arr}`)
    if(!Array.isArray(arr) ){
        return arr
    }
    const middle = 0
    const middleEl = arr[middle]
    const left = [], right = [];
    for(let i=0; i< arr.length; i++){
        if(middle !== i){
            if(arr[i] < middleEl){
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
    }
    console.log(`quickSort :: middleEl = ${middleEl}`)
    let leftRst = []
    let rightRst = []
    if(left.length >0){
        leftRst = quickSort(left)
    }
    if(right.length > 0) {
        rightRst = quickSort(right)
    }
    return [...leftRst, middleEl, ...rightRst]
}

/**
 * 另外一个方式实现快排
 * @param {*} arr 
 * @returns 
 */
function quickSort2(arr) {
    if(arr.length <=1) {
        return arr
    }
    const middle = 0;
    const middleEl = arr[middle]
    const left = [], right = [];
    for(let i=0; i<arr.length; i++) {
        if(middle !==i) {
            if( arr[i] < middleEl ){
                left.push(arr[i])
            }else {
                right.push( arr[i] )
            }
        }
    }
    return quickSort2(left).concat(middleEl, quickSort2(right))
}

function test1(){
    const arr = [5,9,1,3,10,21,7,9,6]; // 有序度低的数组 
   
    console.log(quickSort([...arr])) // 拷贝arr后再传进去，因为会修改arr
    console.log(`~~~~~~~~~~~~~`)   
    console.log(quickSort2([...arr])) // 拷贝arr后再传进去，因为会修改arr
    
}

function startTest(){
    test1();
}

startTest()