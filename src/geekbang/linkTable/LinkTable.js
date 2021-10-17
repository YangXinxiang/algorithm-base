/**
经常用来检查链表代码是否正确的边界条件有这样几个：
如果链表为空时，代码是否能正常工作？
如果链表只包含一个结点时，代码是否能正常工作？
如果链表只包含两个结点时，代码是否能正常工作？
代码逻辑在处理头结点和尾结点的时候，是否能正常工作？

 */
function Node(data, key=""){
    this.data = data;
    this.next = null;
    this.pre = null;
}
function LinkTable() {
    this.head = null;
    // this.next = null;
    // this.data = null;
}

const prop = {
    /**
     * @param {any} data, 添加进入链表的内容
     */
    add(data){
        const n = new Node(data);
        if(!this.head){
            this.head = n;
        }else{
            let current = this.head;
            while(current.next){
                current = current.next;
                //break;
            }
            n.pre = current;
            current.next = n;
        }
    },

    insert(data, target){
        if(!target){
            return this.add(data);
        }
        // 查找值，找到第一个相同的值，插进去
        const current = this.head.next;
        while(current){
            if(current.data === target){
                break;
            }
            current = current.next;
        }
        // 如果没找到，插到最后面
        if(!current){
            return this.add(data);
        }

        const n = new Node(data);
        n.next = current.next;
        n.pre = current;
        current.next = n;
    },

    find(data){
        let current = this.head;
        while(current){
            if(current.data === data){
                return current;
            }
            current = current.next;
        }
        return undefined;
    },
    findLast(){
        let current = this.head;
        while(current){
            if(current.next === null){
                return current;
            }
            current = current.next;
        }
        return undefined;
    },
    /**
     * 按双向链表方式实现链表翻转
     * @returns 
     */
    reserve(){
        let current = this.head;
        let headNode = null;
        while(current){
            // 交换 next 和 pre
            const temp = current.next;
            current.next = current.pre;
            current.pre = temp;
            if(current.pre === null){
                headNode =  current;
            }
            current = current.pre;
        }
        this.head = headNode;
        return this;
    }
};
Object.assign(LinkTable.prototype, prop);

function test(){
    const lt = new LinkTable();
    lt.add("a");
    lt.add("b");
    lt.add("c");
    lt.add("d");
    //lt.insert("xx", "b");
    console.log(lt);
    lt.reserve()
    console.log(`after reverse`);
    console.log(lt);
}

test();

module.exports = {LinkTable};