/**
 * 再练习 顺序队列
 * 2021.10.18
 * 
 */

/**
 * 基于数组实现的 顺序 队列
 * 这个版本在入队的时候会借助数组方法
 */
class ArrayQueue {
    constructor(capacity) {
        this.capacity = capacity
        this.container = [] // 队列容器
        this.head = 0 // 头指针
        this.tail = 0 // 尾指针，准确的说是尾+1指针
    }
    /**
     * 将数据入队
     * @param {*} data 
     * @returns 
     */
    enqueue(data) {
        // 如果尾指针已经到最后，看看是否需要做
        if(this.tail >= this.capacity) {
            if(this.head ===0 ) {
                console.error(`enqueue :: failed, the container is full, head = ${this.head}, tail = ${this.tail}, capacity = ${this.capacity}`)
                return false
            }
            // 如果队列已经满了，此时有可删除的元素，做一次真正的删除。这里直接用数组的 slice 了
            this.container = this.container.slice(this.head)
            this.tail = this.tail - this.head
            this.head = 0
        }
        // 先考虑正常情况
        this.container.push(data)
        this.tail ++;
        return true  
    }
    /**
     * 将最先入队的元素出队
     * @returns 返回当前最先入队的元素，或者 null
     */
    dequeue() {
        if(this.head < this.tail) {
            const el = this.container[this.head]
            this.head ++ 
            return el
        }else {
            // 出队到最后，把容器清空一次
            this.container =[]
            this.tail = 0
            this.head = 0
            return undefined
        }       
    }
}

/**
 * 基于数组实现的队列： 会搬移数据
 */
class ArrayQueue3{
    constructor(capacity) {
        this.capacity = capacity
        this.container = []
        this.head = 0
        this.tail = 0
    }

    /**
     * 将数据入队，如果队列已经“满了”，尝试进行一次数据搬移
     * 搬移之后，不真正的删除数据，可能会导致一定能过的内存泄露。
     * @param {*} data 
     * @returns 
     */
    enqueue(data) {
        // 如果此时已经满了，尝试做一次数据搬移
        if(this.tail >= this.capacity){
            if(this.head === 0) {
                // 此时队列是真满了
                console.error(`enqueue :: failed, the queue is full~~`)
                return false
            }
            // 搬移数据
            for(let i=this.head; i<this.capacity; i++) {
                const newPosition = i - this.head
                this.container[newPosition] = this.container [i];
            }
            // 更新头和尾
            this.tail = this.tail - this.head
            this.head = 0
        }
        this.container[this.tail] = data
        this.tail ++
        return true
    }

    /**
     * 将数据出队
     * @returns 
     */
     dequeue() { 
        // 如果已经没有可以出队的数据了
        if(this.head >= this.tail){
            console.warn(`dequeue :: warning, there is no data tobe dequeue`)
            return undefined
        }
        const data = this.container[this.head]
        this.head ++ 
        return data
    }

}

function test1(){
    const aq = new ArrayQueue(3);
   aq.enqueue(1)
    aq.enqueue(3)
   aq.enqueue(5)
    aq.enqueue(7)
    aq.enqueue(9)
    aq.dequeue(1)
    aq.dequeue(7)
    
    console.log(aq)
}




function test2(){
    const aq = new ArrayQueue3(5);
    const str = "abcdef"
    for(const char of str){
        const result = aq.enqueue(char);
        if(!result){
            console.warn(`test2 :: capacity = ${aq.capacity}, char = ${char}`);
        }
    }
    console.log(`after enqueue 1`);
    console.log(aq);
    const step1 = 5;
    for(let i=0; i<step1; i++){
        aq.dequeue();
    }
    console.log(`after dequeue 1`);
    console.log(aq);

    aq.enqueue("g");
    aq.enqueue("h");
    aq.enqueue("i");
    console.log(`after enqueue 2`);
    console.log(aq);
    aq.dequeue();
    aq.dequeue();
    console.log(`after dequeue 2`);
    console.log(aq);
}

function startTest(){
    //test1()
    test2()
}




startTest()