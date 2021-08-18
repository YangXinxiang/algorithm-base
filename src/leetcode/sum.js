var maxArea = function(height) {
    let i=0;
    let j=height.length-1;
    let area = 0;
    let max = 0;
    while(i<j){
        area = (j-i)*Math.min(height[i], height[j]);
        max = Math.max(max, area);
        if(height[i]<height[j]){
            i++;
        }else{
            j--;
        }
    }
    return max;
};

// https://leetcode-cn.com/problems/3sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumClosest = function(nums, target) {
    // 先从小到大排序一下数组
    nums.sort((a,b) => a>b ? 1: -1);
    console.log(nums);
    let sum = 0;
    let dis = Infinity;
    for(let i=0; i<nums.length; i++){
        let left = i+1,right = nums.length -1;
        // let currentDis;
        while(left<right){
            if(right === i){
                right -- ;
                continue;
            }
            const currentSum = nums[i] + nums[left] +  nums[right];            
            const currentDis = currentSum - target;
            const absDis = Math.abs(currentDis);
            // currentDis = temp;
            if(absDis < dis){
                dis = absDis;
                sum = currentSum;
            }
            if(currentDis > 0){
                right --;
            }else{
                left ++;
            }
        }      
    }
    return sum;
};

// https://leetcode-cn.com/problems/4sum/
/*
给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] ：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。

*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
 var fourSum = function(nums, target) {
    nums.sort((a,b)=> a>b ? 1 : -1);
    const result = [];
    const cache = new Map();
    // 要取四个数。。。。，双重循环加双重指针？？
    for(let i=0; i< nums.length-1; i++) {
        for(let j=i+1; j<nums.length; j++){
            let left = j+1, right = nums.length-1;
            while(left < right ) {
                let sum = nums[i]+nums[j]+ nums[left] + nums[right];
                if(sum === target) { 
                    const temp = [nums[i], nums[j],  nums[left],  nums[right]];
                    const key = temp.join("--");
                    if(!cache.get(key)){
                        result.push(temp);
                        cache.set(key, true);
                    }                    
                    // 这时候左边也移动一个
                    left ++;
                }else if(sum > target){
                    right --;
                }else{
                    left ++;
                }
            }
        }
    }
    return result;
};

function test1(){
    //const nums = [1,0,-1,0,-2,2], target = 0;
    const nums =[2,2,2,2,2], target = 8;
    console.log(fourSum(nums, target)); // [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
}

function startTest(){
    test1();
}

startTest();