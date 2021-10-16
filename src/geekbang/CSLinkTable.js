// 练习单向循环链表
class Node{
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
/**
 * 单向循环链表
 */
class CSLinkTable{
    constructor() {
        this.head = null;
    }
    /**
     * 在链尾添加元素
     * @param {*} data 
     * @returns 
     */
    add(data) {
        const n = new Node(data)
        if(!this.head){
            this.head = n
            n.next = this.head            
            return this
        }
        // 找到链尾，添加到链尾
        let current = this.head.next
        // next 指向头的节点就是尾节点
        while(current.next !== this.head) {
            current = current.next
        }
        current.next = n
        n.next = this.head        
        return this
    }
    /**
     * 将数据存储到第一个指定数据originalData节点后面，如果没有找到指定的数据originalData的节点，添加到链尾
     * @param {*} data 
     * @param {*} originalData 
     * @returns 
     */
    appendAfter(data, originalData) {
        const n = new Node(data)
        //  特殊处理下没有数据时候的场景
        if(!this.head){
            this.head = n;
            n.next = this.head
            return
        }
        let current = this.head
        while(current.next !== this.head) {
            if(current.data === originalData){
                const next = current.next
                current.next = n
                n.next = next
                return
            }
        }
        
        // 处理只有一个节点，该节点就是要找的数据，以及
        // 处理尾节点，此时 current是尾节点。
        // 只有一个节点的时候，也归属到这里处理，只有一个节点不会进入while循环，只有一个的时候不管数据是不是要找的，都添加到尾节点后，第一个节点就是尾节点
        const next = current.next
        current.next = n
        n.next = next
        return this
    }

    /**
     * 移除第一个节点data为给定data的节点
     * @param {*} data 
     * @returns 
     */
    remove(data) {
        if(!this.head){
            return this;
        }
        let pre = this.head
        let current =this.head.next
        // 特殊处理删除的是第一个元素，
        if(this.head.data === data){            
            // 只有一个元素
            if(current === this.head){ 
                this.head.next = null // 第一个元素的指向置为null               
                this.head = null
                return
            } 
            // 只有两个元素，修正一下尾元素
            if(current.next === this.head){
                this.head.next = null // 第一个元素的指向置为null  
                this.head = current
                current.next  = this.head                
                return
            }           
        }
        while(current !== this.head) {
            const next = current.next
            if(current.data === data){
                pre.next = next
                return
            }
            // 向后滑动
            pre = current
            current = next

        }
        return this
    }

    /**
     * 链表反转
     * @returns 
     */
    reverse(){
        // 链表中没有节点，或者只有一个节点，因为是循环链表，只有一个节点，那么该节点一定是指向自己的。
        if(!this.head || this.head.next === this.head){
            return this
        }
        let pre = this.head
        let current = pre.next
        // pre在尾节点的时候，current在头节点
        while(current !== this.head) {
            const next = current.next
            current.next = pre // 反转
            // 开始滑动
            pre = current
            current = next            
        }
        // 修改头节点和尾节点的指向，此时 pre 是尾节点
        this.head.next = pre // 原来的头节点指向尾节点
        this.head = pre
        return this
    }
}


function test1(){
    const lts = new CSLinkTable();
    lts.add(1)
    lts.add(3)
    // lts.add(5)
    // lts.add(7)
    // lts.add(9)
    //lts.remove(5)
    lts.reverse()
    // lts.insertAfter(3,4)
    // lts.insertAfter(5,6)
    // lts.insertAfter(9,10)
    console.log(lts)
}

function startTest(){
    test1()
}

startTest()