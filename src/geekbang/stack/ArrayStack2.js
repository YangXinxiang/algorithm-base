/**
 * 再练习顺序栈
 * 栈： 先入后出， 后入先出
 */
class ArrayStack {
    constructor(capacity) {
        this.capacity = capacity
        this.container = []
        this.tail = 0
    }
    /**
     * 
     * @param {*} data 
     * @returns 
     */
    push(data) {
        if(this.tail >= this.capacity) {
            return false
        }
        this.container.push(data)
        this.tail ++
        return true
    }
    /**
     * 出栈
     */
    pop(){
        if(this.tail <=0){
            return undefined
        }
        const data = this.container.pop()
        this.tail--
        return data
    }

    clear() {
        this.container = []
        this.tail = 0
    }
}

class BHistory {
    constructor(capacity) {
        this.capacity = capacity
        this.forwardStack = new ArrayStack(capacity) // 向前栈，访问新页面的时候添加记录，
        this.gobackStack = new ArrayStack(capacity) // 向后栈，向后的时候出栈
    }

    /**
     * 访问新页面
     * @param {*} url 
     * @returns 
     */
    add(url) {
        this.forwardStack.clear()
        this.gobackStack.push(url)
        return true
    }
    // 向前浏览
    forward() {
        const last = this.forwardStack.pop()
        if(last) {
            this.gobackStack.push(last)
            return last
        }else {
            return -1
        }
    }

    goback() {
        const last = this.gobackStack.pop()
        if(last) {
            this.forwardStack.push(last)
            return last
        }
        return -1
    }
}

function test1(){
    const stack = new ArrayStack(5);
    stack.push("a");
    stack.push("b");
    stack.push("c");
    stack.push("d");
    stack.push("b");
    stack.push("e");
    stack.push("f");
    stack.push("g");
    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();
    console.log(stack.container);
}

function test3(){
    const bh = new BHistory();
    bh.add("www.baidu.com");
    bh.add("www.126.com");
    bh.add("www.sina.com");
    bh.add("www.px.com");
    bh.add("www.xx.com");
    bh.goback();
    bh.goback()
    bh.goback()
    bh.forward()
    bh.goback();
    bh.add("www.1111.com")
    console.log(bh);
    
}
function startTest(){
    // test1();
    test3();
}

startTest()