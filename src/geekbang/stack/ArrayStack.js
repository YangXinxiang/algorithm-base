// 学习 https://time.geekbang.org/column/article/41222 之后的练习
const {LinkTable} = require("./LinkTable");
// 基于数组的顺序栈
function ArrayStack(size){
    this.size = size;
    this.container = [];
}
const prop = {
    push(data){
        if(this.container.length < this.size){
            this.container.push(data);
        }else{
            throw new Error("Opps, the stack is full!");
        }
    },
    pop(){
        return this.container.pop();
    },
    clear(){
        this.container = [];
    },
    toString(){
        return `[ArrayStack] :: ${this.container.join(",")}`
    }

}
Object.assign(ArrayStack.prototype, prop);

function LinkTableStack(capacity){
    this.capacity = capacity;
    this.length = 0;
    this.container = new LinkTable();
}
const ltsProp = {
    push(data){
        if(this.length < this.capacity){
            this.container.add(data);
            this.length ++ ;
        }else{
            throw new Error("Opps, the stack [LinkTableStack] is full!");
        }
    },
    pop(){
        const last = this.container.findLast();
        const data = last.data;
        if(last.pre){
            last.pre.next = null;
            this.length --;
            
        }
        return data;
    }
}
Object.assign(LinkTableStack.prototype, ltsProp);

// 实现浏览器的前进、后退、访问新页面等时候的记录问题。
function BHistory() {
    this.gobackStack = new ArrayStack(10);
    this.forwardStack = new ArrayStack(10);
}
BHistory.prototype = {
    add(url){
        this.forwardStack.clear(); // 访问新页面，添加记录的时候，向前栈清空
        this.gobackStack.push(url); // 向后历史栈添加一条记录
    },
    goback(){
        const url = this.gobackStack.pop();
        if(url){
            this.forwardStack.push(url)
        }
    },
    forward(){
        const url = this.forwardStack.pop();
        if(url){
            this.gobackStack.push(url)
        }
    },
    toString(){
        return `gobackStack :: ${this.gobackStack.toString()} |||| forwardStack :: ${this.forwardStack.toString()}`
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
    console.log(stack.container);
}

function test2() {
    const stack = new LinkTableStack(5);
    stack.push("a");
    stack.push("b");
    stack.push("c");
    stack.push("d");
    stack.push("b");
    // stack.push("e");
    // stack.push("f");
    // stack.push("g");
    console.log(`will pop`)
    console.log(stack.pop());
    console.log(stack.pop());
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
    test3();
}
startTest()

