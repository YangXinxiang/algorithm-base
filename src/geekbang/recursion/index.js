// 递归我理解的还是不彻底。
// 这个文件夹下，就专门训练递归。用几天的时间，专门的联系递归的编程技巧： 2021.08.29

function getTime(){
    return new Date().getTime();
}
// 求阶乘：n*(n-1)*(n-2)*(n-3)....1
function jiechen(n){
    // 每一项的阶乘的结果，等于该项乘以前面n-1项的总结果
    // 因此可以写出公式： f(n) = n* f(n-1), f(1) = 1;
    if(n===1){
        return 1;
    }
    return n*jiechen(n-1);
}

// 斐波那契数列： 第一项1，第2项1，从第3项开始，每一项等于前两项之和： [1,1,2,3,5,8,13,21,34,55,89]
function fib(n){
    // 分析： 任何一项都等于前两项之和。求第n项，如果知道第n-1、n-2项，加起来就是第n项的值。对于每一项都是这样求解。规律一样。
    // 递推公式： f(n) = f(n-1) + f(n-2); f(1)=1;f(2)=1
    if(n<=2){
        return 1
    }
    return fib(n-1)+fib(n-2);
}
function test1(){
    const start = getTime();
    // console.log(getGoStepCount(40));

    console.log(jiechen(5));
    // console.log(jiechen2(5));
    const end = getTime()
    console.log(`test1 :: end, duration = ${end - start}`) 
}

// 把一个数组拆分成单个元素的数组
function splitArr(arr){
    if(arr.length <=1)  return arr;
    const mid = Math.floor(arr.length/2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);

    // const result = [];
    // for(const li of left){
    //     result.push([li])
    // }
    // for(const ri of right){
    //     result.push([ri])
    // }
    // result.push(splitArr(left))
    // result.push(splitArr(right))
    return left.concat(...right);
}
function test2(){
    const start = getTime();
    // console.log(getGoStepCount(40));

    console.log(fib(1));
    // console.log(jiechen2(5));
    const end = getTime()
    console.log(`test2 :: end, duration = ${end - start}`) 
}

function test3(){
    const arr = [8,4,5,7,1,3,6,2]
    const rst = splitArr(arr)
    console.log(rst);
}


function startTest(){
    test3();
}
startTest()