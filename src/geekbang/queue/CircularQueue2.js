// 再练习循环队列, 2021.10.18

class CircularQueue {
    // 
    constructor(capacity) {
        this.capacity = capacity
        this.container = []
        this.head = 0
        this.tail = 0
    }
    /**
     * 将数据入队
     * @param {*} data 
     * @returns 
     */
    enqueue(data) {
        const newTail = (this.tail +1) % this.capacity
        // 队满了
        if(newTail === this.head){
            console.log(`enqueue :: warning, the queue is full`)
            return false
        }
        this.container[this.tail] = data
        this.tail = newTail
        return true
    }
    /**
     * 
     */
    dequeue(){
        // 如果已经队空了。
        if(this.head === this.tail){
            return undefined
        }
        const data = this.container[this.head]
        this.head = (this.head + 1) % this.capacity
        return data
    }
}


function test1(){
    const aq = new CircularQueue(5);
    const str = "abcdef"
    for(const char of str){
        const result = aq.enqueue(char);
        if(!result){
            console.warn(`test1 :: capacity = ${aq.capacity}, char = ${char}`);
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
    test1();
}

startTest()