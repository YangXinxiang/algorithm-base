/**
 * 双向循环链表  DCLinkTable
 * 目前添加、删除、插入、反转功能都已OK
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

class DCLinkTable {
    constructor() {
       this.head = null    
    }
    /**
     * 往双向循环链表中添加元素
     * @param {*} data 
     * @returns 
     */
    add(data) {
        const n = new Node(data)
        if(!this.head) {
            this.head = n;
            n.next = n
            n.pre = n
        }
        // 找到链尾，添加到链尾
        let current = this.head
        while(current.next !== this.head) {
            current = current.next
        }
        current.next = n
        n.pre = current
        n.next = this.head
        this.head.pre = n
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
        let next = current.next
        while(next !== this.head) {
            if(current.data === data) {
                // 如果只有一个节点
                if(current === next) {
                    this.head = null
                    return this
                }
                const pre = current.pre
                pre.next = next
                next.pre = pre
                current.next = null
                current.pre = null
                // 如果删除的事第一个节点，需要更新一下头节点的指向
                if(current === this.head){
                    this.head = next
                }
                return
            }
            // 如果没找到，继续滑动
            current = next
            next = next.next
        }
        // 此时的current是尾节点，检查一下尾节点是不是要删除的节点，删除的是最后一个节点，还有什么更优解吗？
        if(current.data === data) {
            // 如果只有一个节点
            if(current === next) {
                this.head = null
                return this
            }
            current.pre.next = current.next
            current.next.pre = current.pre
            current.next = null
            current.pre = null
        }
        return this
    }

    /**
     * 在指定节点originalData后面插入数据data节点，如果没有originalData，插入到链尾。
     * @param {*} data 
     * @param {*} originalData 
     * @returns 
     */
    insertAfter(data, originalData) {
        if(!this.head){
            return this.add(data)
        }
        let current = this.head
        // 这里用do while循环，规避掉要特殊处理最后一个节点的情况，一开始的时候 current 就是 this.head，但是也要进入循环体一次，
        // 后面循环的过程中, current 都不等于this.head，最后一个节点再滑动一次 current = current.next
        // 此时 current 等于this.head，就不进入循环体了。
        do{
            // 找到数据节点，或者到达最后一个节点（不管是不是要找的数据），附加到该节点后面。
            if(current.data === originalData || current.next === this.head){
                const n = new Node(data)
                const next = current.next
                current.next = n
                n.pre = current
                n.next = next
                next.pre = n
                return this
            }
            // 如果没找到，就继续往后滑动
            current = current.next
            
        } while(current !== this.head)
    }
    /**
     * 双向循环链表的反转，双向循环链表反转比较简单，仅交换前后驱指向，最后更新一下this.head的指向就好了。
     */
    reverse() {
        if(!this.head) {
            return
        }
        let current = this.head
        do {
            // 交换前后驱节点指向
            const next = current.next
            current.next = current.pre
            current.pre = next

            // 滑动
            current = next
        } while(current !== this.head)
        // 修正一下 this.head指向， 此时current是第一个，此时第一个的下一个就是最后一个（因为已经反转完了）
        this.head = current.next
    }
}

function test1(){
    const dts = new DCLinkTable();
   dts.add(1)
    // dts.add(3)
//    dts.add(5)
//     dts.add(7)
//     dts.add(9)
    // dts.remove(1)
   // dts.remove(3)
    // 
   // dts.insertAfter(8,7)
    dts.reverse()
    // dts.insertAfter(5,6)
    // dts.insertAfter(9,10)
    console.log(dts)
}

function startTest(){
    test1()
}

startTest()