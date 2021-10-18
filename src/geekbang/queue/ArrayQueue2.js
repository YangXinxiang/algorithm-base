/**
 * 一个较高性能的基于数组的顺序队列实现。先入先出。
 * 这里会采用空间换时间的策略，可能底层容器 this.container = [] 一直是满的，
 * 通过双指针this.head、this.tail从逻辑上控制对空、队满，而非真实的this.container里面的数据判断
 * 这个版本可能会有内存泄露问题，外部以为已经出队不在使用了，但其实ArrayQueue底层数据可能还在引用。
 * 练习自： https://time.geekbang.org/column/article/41330
 */
class ArrayQueue {
    constructor(capacity){
        this.capacity = capacity;
        this.container = [];
        this.head = 0;
        this.tail = 0;
    }
    /**
     * 将数据推入队列末尾位置。
     * @param {*} data 
     * @returns {boolean} 入队成功或者失败的状态
     */
    enqueue(data){
        if(this.tail === this.capacity){
            // 如果存储真的已满
            if(this.head === 0){
                return false;
            }
            // 如果tail到最后了，但是head已经不为0，说明前面有一部分数据已经出队了，可以做一次数据搬移
            // 搬移的时候，将head ~~ tail的数据，搬移到从0开始
            for(let i = this.head; i < this.tail; i++){
                const newPosition = i - this.head;
                this.container[newPosition] = this.container[i]; // 数据搬移，将head ~~ tail的数据，搬移到从0开始
                
            }
            // 搬移完成数据之后，做一次指针的更新
            this.tail = this.tail - this.head;
            this.head = 0;
        }
        this.container[this.tail] = data;
        this.tail ++;
        return true;        
    }
    /**
     * 将最先入队的数据出队，对空
     */
    dequeue(){
        // 如果队空，返回null， 
        // 注意，这里的实现中，对空并不是说this.container没有数据，只是this.container中没有可以继续出队的数据，数据都已经出队完了。
        if(this.head === this.tail){
            return null;
        }
        const data = this.container[this.head];
        this.head ++;
        return  data;
    }
}

function test1(){
    const aq = new ArrayQueue(5);
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
module.exports = {ArrayQueue}