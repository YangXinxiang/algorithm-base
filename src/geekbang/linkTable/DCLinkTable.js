/**
 * 双向循环链表  DCLinkTable
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

    insertAfter(data, originalData) {
    }

    reverse() {}
}

function test1(){
    const dts = new DCLinkTable();
   dts.add(1)
     dts.add(3)
//    dts.add(5)
//     dts.add(7)
//     dts.add(9)
    // dts.remove(1)
    dts.remove(3)
    // dts.reverse()
    // dts.insertAfter(4,3)
    // dts.insertAfter(5,6)
    // dts.insertAfter(9,10)
    console.log(dts)
}

function startTest(){
    test1()
}

startTest()