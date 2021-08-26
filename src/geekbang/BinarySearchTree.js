// https://time.geekbang.org/column/article/68334
/**
 * 二叉查找树是二叉树中最常用的一种类型，也叫二叉搜索树。
 * 顾名思义，二叉查找树是为了实现快速查找而生的。不过，它不仅仅支持快速查找一个数据，还支持快速插入、删除一个数据。
 * 它是怎么做到这些的呢？这些都依赖于二叉查找树的特殊结构。
 * 二叉查找树要求，在树中的任意一个节点，其左子树中的每个节点的值，都要小于这个节点的值，而右子树节点的值都大于这个节点的值。
 * 我画了几个二叉查找树的例子，你一看应该就清楚了。
 */
class BSNode{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.status = 1;
    }
}
class BinarySearchTree {
    constructor(){
        this.head = null;
    }
    append(data){
        const bsn = new BSNode(data);
        if(!this.head){
            this.head = bsn;
            return this;
        }
        // 找到需要查找的节点、父节点
        let node  = this.head;
        let parent = this.head;
        while(node){
            parent = node;
            // 支持添加重复的元素，重复的元素按大于当前元素算，添加在其右子节点上。
            if(data >= node.data ){
                node = node.right
            }else{
                node = node.left;
            }
        }
        if(data >= parent.data){
            parent.right = bsn;
        }else{
            parent.left = bsn;
        }
        return this;
    }
}
// 其余方法可以参考 binaryTree.js中的

function test1(){
    // const arr = [13,16,17,18,19,25,27,33,34,50,51,58,66];
   // const arr = [33,17, 50, 13, 18, 34, 58, 16, 25, 51, 66, 19, 27];
    const arr = [13,8, 18, 6, 10, 16,20,18];
    const bst = new BinarySearchTree();
    for(let i=0; i< arr.length; i++){
        bst.append(arr[i])
    }
    console.log(bst);
}
function startTest(){
    test1()
}
startTest();