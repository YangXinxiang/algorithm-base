class Node{
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class CLinkTable {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    /**
     * 往双向循环链表中添加数据
     * @param {*} data 
     * @returns 
     */
    add(data){
        const n = new Node(data)
        if(this.head === null){
            this.head = n
            n.next = this.head
            return true;
        }
        // 找到尾节点
        let pre = this.head;
        while(pre.next !== this.head) {
            pre = pre.next
        }
        // 
        if(pre.next === this.head) {
            pre.next = n;
            n.next = this.head;
            return true;
        } else {
            console.log(`add :: failed, did not find tail node`)
            return false
        }
    }
    /**
     * 循环链表翻转
     * @returns 
     */
    reverse(){
        if(!this.head) {
            return true;
        }
        let pre = this.head;
        let current = pre.next;
        while(current !==this.head) {
            const next = current.next
            current.next = pre;
            pre = current;
            current = next
        }
        // 此时的current 就是尾节点
        this.head.next = pre
        this.head = pre
        return true
    }
}

function test1() {
    const clt = new CLinkTable();
    clt.add(1);
    clt.add(2);
    clt.add(3);
    clt.reverse()
    console.log(clt)
}

function startTest() {
    test1()
}
startTest()