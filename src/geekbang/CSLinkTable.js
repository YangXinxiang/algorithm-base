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
            n.next = this.head
            this.head = n
            return this
        }
        // 找到链尾，添加到链尾
        let current = this.head.next
        while(current) {

        }
        return this
    }
}