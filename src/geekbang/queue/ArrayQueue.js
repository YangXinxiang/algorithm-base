// 学习： https://time.geekbang.org/column/article/41330
function ArrayQueue(capacity){
    this.capacity = capacity;
    this.container = [];
    this.head = 0;
    this.tail = 0;
}

const prop = {
    /**
     * 队列入队
     * @param {*} data 
     */
    enqueue(data){
        if(this.container.length >= this.capacity){
            // 在某些语言实现中，可以考虑搬移数据
            // throw new Error("Opps, error, the container is full");
            // 数据满了的时候，统一做一次数据删除
            this.container.splice(0, this.head);
            this.tail = this.tail - this.head; // 更新head和tail指针
            this.head = 0;
        }
        this.container.push(data);
        this.tail = this.container.length;
    },
    /**
     * 出队删除数据的时候，不用数组的shift，否则每次出队，都需要O(n**2)的时间复杂度。
     * 这里采取空间换时间的策略，不shift
     * @returns 
     */
    dequeue(){          
        if(this.head  >= this.tail){
            this.container = [];
            this.head = 0;
            this.tail = 0;
            return undefined;
        }
        data = this.container[this.head]; // 这里做出队的操作，这里不用数组的删除操作
        this.head++;
        return data;
    }

}
Object.assign(ArrayQueue.prototype, prop);

function test1(){
    const aq = new ArrayQueue(5);
    aq.enqueue("a");
    aq.enqueue("b");
    aq.enqueue("c");
    aq.enqueue("d");
    aq.enqueue("e");
    console.log(aq.dequeue());
    console.log(aq.dequeue());
    console.log(aq)
    aq.enqueue("f");
    console.log(aq)
    console.log(aq.dequeue());
    console.log(aq.dequeue());
    console.log(aq.dequeue());
    console.log(aq.dequeue());
    console.log(aq.dequeue());
    console.log(aq)
}

function startTest(){
    test1();
}
startTest()