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
    }
};
Object.assign(LinkTable.prototype, prop);

function test(){
    const lt = new LinkTable();
    lt.add("a");
    lt.add("b");
    lt.add("c");
    lt.add("d");
    lt.insert("xx", "b");
    console.log(lt);
}

test();