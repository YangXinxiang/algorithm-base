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
}


function test1(){
    const lts = new CSLinkTable();
    lts.add(1)
    lts.add(3)
    lts.add(5)
    // lts.add(7)
    // lts.add(9)
    lts.remove(5)
    // lts.reverse()
    // lts.insertAfter(3,4)
    // lts.insertAfter(5,6)
    // lts.insertAfter(9,10)
    console.log(lts)
}

function startTest(){
    test1()
}

startTest()