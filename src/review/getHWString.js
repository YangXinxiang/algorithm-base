/**
 * 复习 获取最大长度的回文字符串。
 * 感觉这个实现的时间复杂度有点高，是否有更高效的实现呢？
 * 2021.10.19
 */

/**
 * 判断一个给定的字符串是否是回文字符串
 * @param {*} str 
 * @returns 
 */
function isHWString(str) {
    const reverseStr = str.split("").reverse().join("")
    return str === reverseStr
}
/**
 * 获取给定字符中的最长回文字符串
 * @param {*} str 
 * @returns 
 */
function getMaxHWString(str) {   
    let start = 0, end = 0;
    let maxHWString = ""
    for(let i=0; i<str.length; i++) {
        for(let j = i + 1; j<str.length; j++) {
            const strHW = str.substring(i, j)
            if(isHWString(strHW)){
                if(strHW.length > maxHWString.length){
                    maxHWString = strHW
                    start = i
                    end = j
                }
            }
        }
    }
    return {
        maxHWString,
        start,
        end
    }
}

function test1() {
    console.log(isHWString("aba"))  
    console.log(isHWString("abba"))  
    console.log(isHWString("abc"))  
}
function test2() {
    const str = "agaljgabbagiuqkrh"
    const rst = getMaxHWString(str)
    console.log(rst)
}
function startTest() {
    test1()
    test2()
}
startTest()