// 归并排序练习
function mergeSort(arr){
    if(arr.length <2){
        return arr;
    }
    const mid = arr.length/2;
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    const leftSplited = mergeSort(left);
    const rightSplited = mergeSort(right);
    return merge(leftSplited, rightSplited);
}
// 合并做分支数组和右分支数组，左分支和右分支在自己数组里面已经是有序的。所以就方便很多。
function merge(left, right){
    // 剪枝优化
    if(left[left.length -1] <= right[0]){
        return left.concat(right)
    }
    if(right[right.length-1] <= left[0]){
        return right.concat(left)
    }

    let temp = [];
    let leftIndex =0, rightIndex = 0;
    
    while(leftIndex < left.length && rightIndex < right.length) {
        if(left[leftIndex] <= right[rightIndex]) {
            temp.push(left[leftIndex]);
            leftIndex ++;
        }else{
            temp.push(right[rightIndex]);
            rightIndex ++;
        }
    }
    // 最后，检查一下是否有数组内容没有拷贝完
    if(leftIndex < left.length){
        temp = temp.concat(left.slice(leftIndex))
    }
    if(rightIndex < right.length){
        temp = temp.concat(right.slice(rightIndex))
    }
    return temp;
}

function test5(){
    // const arr = [8,4,5,7,9, 1,3,6,2]
    //const arr = [1,2,3,4,5,6,7,8]
    const arr = [8,7,6,5,4,3,2,1]
    // const rst = []
    // rst.push(...arr)
    const rst = mergeSort(arr)
    console.log(rst);
}

function startTest(){
    test5();
}
startTest()