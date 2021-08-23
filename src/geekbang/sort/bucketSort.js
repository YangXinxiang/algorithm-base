// 练习桶排序
function bucketSort(arr){
    const range = [0,5];
    //const bucket = [];
    const {bucket,offset} =  createSubBucket([], range);
    const jishuArr = [];
    for(let i=0; i< arr.length; i++){
        bucket[arr[i]].push(arr[i]);        
    }
    const sumedArr = sumBucket(bucket);
    
    return {bucket, sumedArr};
    
}
function createSubBucket(bucket, range){
    for(let i=range[0]; i<= range[1]; i++){
        bucket.push([])
    }
    return {
        bucket,
        offset:range[0]
    }
}

function sumBucket(bucket){
    const rst = [];
    let sum = 0;
    for(let i=0; i<= bucket.length; i++){
        sum += bucket[i].length;
        rst.push(sum)
    }
    return rst;
}

function getTime(){
    return new Date().getTime()
}
function test1(){
    const start = getTime();
    const arr1 = [8,6,1,5,10,21,30,2];
    const arr2 = [8,6];
    const arr3 = [8,9,1];
    const arr4 = [4,2,1,1,1,0,2,4,5,1,2,3,5,3,1];
    console.log(bucketSort(arr4));
    
    const end = getTime()
    console.log(`test1 :: end, duration = ${end - start}`) 
}

function startTest(){
    test1();
}
startTest()
