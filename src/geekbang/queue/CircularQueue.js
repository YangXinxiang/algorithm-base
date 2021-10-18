/**
 * 一个较高性能的基于数组的顺序【循环】队列实现。先入先出。循环队列会多占用一个位置存储数据，所以所存储的数据会比容量小1
 * 这里会采用空间换时间的策略，可能底层容器 this.container = [] 一直是满的，
 * 通过双指针this.head、this.tail从逻辑上控制对空、队满，而非真实的this.container里面的数据判断
 * 这个版本可能会有内存泄露问题，外部以为已经出队不在使用了，但其实CircularQueue底层数据可能还在引用。
 * 练习自： https://time.geekbang.org/column/article/41330
 */
class CircularQueue{
    constructor(capacity){
        this.capacity = capacity;
        this.container = []; // 队列实现的底层容器。
        this.head = 0;
        this.tail = 0;
    }
    enqueue(data){
        const isQueueFull = (this.tail + 1) % this.capacity === this.head;
        if(isQueueFull){
            return false;
        }
        this.container[this.tail] = data; // 因为是循环链表，不需要搬移数据
        this.tail = (this.tail + 1) % this.capacity;
        return true;
    }

    dequeue(){
        const isEmpty = this.head === this.tail;
        if(isEmpty){
            return null;
        }
        const data = this.capacity[this.head];
        this.head = (this.head + 1)% this.capacity; // 这一步很关键，更新好头指针。
        return data;
        
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