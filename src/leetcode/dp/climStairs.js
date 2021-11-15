/**
 * 动态规划练习
 * https://leetcode-cn.com/problems/climbing-stairs/
 */


/**
 * 递归方式求解求爬n台台阶的总方法数
 * 递推公式，方法总数： f(n) = f(n-2) + f(n-1)
 * @param {*} n 
 * @returns 爬n台台阶的总方法数
 */
function climbStairs(n) {
    const cache = new Map()
    /**
     * 内部递归方法，递归方式求解爬n台台阶的所有方法数
     * @param {*} n 
     * @returns 
     */
    function climb(n) {
        if(n === 0) return 0
        if(n === 1) return 1
        if(n === 2) return 2
        // 使用备忘录缓存
        const cachedN = cache.get(n)
        if(cachedN !== undefined) {
            return cachedN
        }
        const result = climb(n-2) + climb(n-1)
        cache.set(n, result) // 存入缓存
        return result        
    }
    return climb(n)
}


/**
 * 动态规划方式求解，从底（小）向上解
 * 时间复杂度： O(n)
 * 空间复杂度： O(n)
 * 最核心的步骤也是状态转移方程，跟递归的递推公式差不多
 * dp[n] =  dp[n-2] + dp[n-1]; dp[0] = 0|1; dp[1] = 1; dp[2] = 2;
 * @param {*} n 要上的总台阶数
 * @returns 爬n台台阶的总方法数
 */
function climbStairsDP(n) {
    const dp = []
    dp[0] = 0
    dp[1] = 1
    dp[2] = 2
    for(let i=3; i<=n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}

/**
 * 动态规划方式求解爬楼梯问题，从底（小）向上解。基于上面的方法优化状态记录，从数组状态记录优化为三个变量，优化存储空间
 * 时间复杂度： O(n)
 * 空间复杂度： O(1)
 * 原状态： dp[n] =  dp[n-2] + dp[n-1]; dp[0] = 0|1; dp[1] = 1; dp[2] = 2;
 * 压缩为： next = pre + current; pre = 1, current = 2, next; pre、current、next滚动更新
 * @param {*} n 要上的总台阶数
 * @returns 爬n台台阶的总方法数
 */
function climbStairsDP2(n) {
    let pre = 1, current = 2, next; //将数组状态滑动为三个变量状态
    for(let i=3; i<=n; i++) {
        next = pre + current
        // 滑动更新变量状态
        pre = current
        current = next
    }
    return next
}



// https://leetcode-cn.com/problems/min-cost-climbing-stairs/

function minCostClimbingStairs(cost) {
    if(cost.length <=1) {
        return cost[cost.length - 1]
    }
    const cache = new Map()

    function select(index) {
        console.log(`select :: enter, index = ${index}`)
        if(index <= 1) {
            return 0
        }
        if(cache.get(index) !== undefined) {
            return cache.get(index)
        }
        const oneStep = cost[index-1] + select(index-1)
        const twoStep = cost[index-2] + select(index-2)
        const result = Math.min(oneStep, twoStep)
        if(cache.get(index) === undefined) {
            cache.set(index, result)
        }
        return result
    }
    return select(cost.length)
}

function minCostClimbingStairsDP(cost) {
    if(cost.length <=1) {
        return cost[cost.length - 1]
    }
    const dp = new Array(cost.length + 1)
    dp[0] = cost[0]
    dp[1] = Math.min(cost[0], cost[1])
    for(let index = 2; index <=cost.length; index++) {
        const current = index>= cost.length ? 0 : cost[index]
        const min = Math.min(dp[index-2] + cost[index-2] , dp[index-1] + cost[index-1]) 
        dp[index] = min
    }
    console.log(dp)
    return dp[cost.length - 1]
}

function  test1() {
    const cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
        
    console.log(minCostClimbingStairs([0,2,2,1]))
    console.log(minCostClimbingStairsDP([0,2,2,1]))
    dp =     [0,0,2,]
}

function test2() {
    const n = 8
    console.log(climbStairs(n))
    console.log(climbStairsDP(n))
    console.log(climbStairsDP2(n))
    
}
function startTest() {
    // test1()
    test2()
}

startTest()