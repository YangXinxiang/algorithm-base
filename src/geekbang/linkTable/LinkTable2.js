function SNode(data, next){
    this.data = data;
    this.next = next;
}

function SLinkTable(){
    this.head = {
        data:null,
        next:null,
    };
}

const SLTPrototype = {
    add(data){
        if(data) {
            const node = new  SNode(data, null);
            if(this.head.next === null){
                this.head.next = node
            }else{
                let last = this.head;
                while(last.next) {
                    last = last.next
                }
                last.next = node
            }
        }
       
       return this;
    },
    /**
     * 找到第一个跟data一样的内容，删掉
     * @param {*} data 
     */
    delete(data) {
        let parent = this.head;        
        while(parent.next) {
            if(parent.next.data === data){
                const temp = parent.next;
                parent.next =  parent.next.next
                temp.next = null
                break;
            } else {
                parent = parent.next
            }
            
        }
        return this;
    },
    /**
     * 
     * @returns 
     */
    reverse(){
        let parent = this.head.next;
        let son = parent.next;
        let last = null
        while(son){
            const subSon = son.next;

            if(!subSon){
                last = son // 找到尾
                son.next = parent
                break
            }else{
                son.next = parent // 指向头一个

                parent = son
                son = subSon
            }
        }
        // 修改头指向， 将头指向尾
        this.head.next.next = null;
        
        this.head.next = last;
        return this
    }
}

Object.assign(SLinkTable.prototype, SLTPrototype);

function test1(){
    const slt = new SLinkTable()
    slt.add(1).add(2).add(3).add(4).add(5);
    console.log(slt);
    //slt.delete(6)
    //console.log(slt);
    slt.reverse();
    console.log(slt);

}

function startTest(){
    test1()
}

startTest()