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






// 继续联系归并排序，练习到滚瓜烂熟。。。
function mergeSort2(arr){
    if(arr.length <2){
        return arr;
    }
    // 将原数组拆分成2个数组
    const mid = arr.length/2;
    const left = arr.slice(0,mid);
    const right = arr.slice(mid)
    // 继续拆左分支和右分支数组，递归的方式拆
    const leftSplited = mergeSort2(left)
    const rightSlited = mergeSort2(right);
    // 递归的将拆完的数组合并起来。
    return merge3(leftSplited, rightSlited)
}
// 合并两个已经有序的数组为一个有序数组
function merge2(left, right){
    const tmp = [];
    for(let i=0; i<left.length; i++){
        for(let j=0; j<right.length; j++){
            if(left[i] <= right[j]){
                tmp.push(left[i]);
                break;
            }else{
                tmp.push(right[j]);
                // break;
            }
        }
    }
}
// 更高效的方式，双指针移动拷贝数组
function merge3(left, right){
    let leftIndwx = 0, rightIndex = 0;
    let tmp = [];
    // 优化处理一下特殊情况
    if(left[left.length-1] < right[0]){
        return left.concat(right)
    }
    if(left[0]>right[right.length-1]){
        return right.concat(left);
    }

    while(leftIndwx < left.length && rightIndex < right.length){
        if(left[leftIndwx] <= right[rightIndex]){
            tmp.push(left[leftIndwx])
            leftIndwx++;
        }else{
            tmp.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // 检查一下是否拷贝完了。这种方式可能还会拷贝完，因为leftIndwx 或者rightIndex可能还没有移动到该数组的最后。
    if(leftIndwx < left.length){
        tmp = tmp.concat(left.slice(leftIndwx))
    }
    if(rightIndex < right.length ){
        tmp = tmp.concat(right.slice(rightIndex));
    }
    return tmp;
}












function test5(){
    // const arr = [8,4,5,7,9, 1,3,6,2]
    //const arr = [1,2,3,4,5,6,7,8]
    const arr = [8,7,9,22,6,5,4,3,11,2,1]
    // const rst = []
    // rst.push(...arr)
    // const rst = mergeSort(arr)
    const rst = mergeSort2(arr)
    console.log(rst);
}

function startTest(){
    test5();
}
startTest()