/**
 * 动态规划练习
 * https://leetcode-cn.com/problems/climbing-stairs/
 */


function climbStairs(n) {
    const dp = []
    dp[0] = 0
    dp[1] = 1
    dp[2] = 2
    for(let i=3; i<=n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
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

function startTest() {
    test1()
}

startTest()