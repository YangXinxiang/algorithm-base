/**
 * 练习双向链表， 2021。10.17
 */

/**
 * 双向链表节点，多一个前驱节点
 */
class Node {
    constructor(data) {
        this.data = data;
        this.pre = null
        this.next = null
    }
}

class DSLinkTable {
    constructor() {
        this.head = null
    }
    
    add(data) {
        const n = new Node(data)
        if(!this.head) {
            this.head = n;
            n.pre = null; // 循环链表第一个节点的前驱节点指向null
            return this
        }
        // 找到链尾，添加到链尾， 链尾的next指向null
        let current = this.head
        // 依次滑动，找到链尾， 链尾的next指向null
        while(current.next){
            current = current.next
        }
        // 此时的 current 就是链尾
        current.next = n
        n.pre = current
        return this
    }
    /**
     * 移除第一个数据等于data的节点，找不到的话不移除。
     * 注意特殊处理一下第一个节点和尾节点
     * @param {*} data 
     */
    remove(data){
        if(!this.head) {
            return this
        }
        let current = this.head
        while(current) {
            const next = current.next
            const pre = current.pre
            if(current.data === data) {
                if(!pre){
                    // 如果是头节点，特殊处理下，直接指向下一个节点就好
                    this.head = next
                }else{
                    pre.next = next
                }
                current.pre = null;
                current.next = null
                // next 可能是尾节点的指向了，需要判断一下
                if(next) {
                    next.pre = pre
                }                
                return this
            }
            // 滑动到下一个节点
            current = next
        }
        return -1
    }
    /**
     * 将指定数据 data ， 插入到数据 originalData后面，如果没有originalData， 插入到最后
     * 注意：特殊处理一下没有数据的时候，没找到数据的时候，以及找到的是最后一个数据的时候
     * @param {*} data 
     * @param {*} originalData 
     * @returns 
     */
    insertAfter(data, originalData) {
        if(!this.head){
            return this.add(data)
        }
        const n = new Node(data)
        let current = this.head
        while(current) {
            let next = current.next
            if(current.data === originalData){
                current.next = n
                n.pre = current
                n.next = next
                // next 可能已经是null， 也就是已经是在尾节点后面插入
                if(next){
                    next.pre = n
                } 
                return this
            }
            // 到尾节点也没找见， 将节点附加到当前节点后面即可
            if(!next) { // next不存在，并且走到这一步（否则已经return了），说明没找到包含 originalData 的节点
                current.next = n
                n.pre = current
                return this;
            }
            current = next
        }
        // 如果此时还有current， 也就是说没找到置为originalData的
        return this
    }
    /**
     * 链表反转， 双向链表反转： 交换前后驱指向，更新头节点指向就好。
     * @returns 
     */
    reverse() {
        // 没有节点，直接返回
        if(!this.head){
            return
        }
        // 只有一个节点，直接返回。
        if(!this.head.next) {
            return
        }
        // 双向链表的翻转很简单，交换前驱、后驱指针，将head指向更新一下就好。
        let current = this.head
        let last = null
        while(current) {
            const temp = current.next
            current.next = current.pre
            current.pre = temp
            if(!temp){
                last = current
            }
            current = temp
        }
        this.head = last
        return this
    }
}

function test1(){
    const dts = new DSLinkTable();
   dts.add(1)
    dts.add(3)
   dts.add(5)
    dts.add(7)
    dts.add(9)
    dts.remove(1)
    dts.remove(7)
    dts.reverse()
    // dts.insertAfter(4,3)
    // dts.insertAfter(5,6)
    // dts.insertAfter(9,10)
    console.log(dts)
}

function startTest(){
    test1()
}

startTest()