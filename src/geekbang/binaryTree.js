class Node{
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree{
    constructor(){

    }
    
}

// 链式二叉树1
const tree = {
    data: "a",
    left: {
        data: "b",
        left:{
            data:"d",
            left : { 
                data : "h"
            }
        },
        right:{
            data:"e"
        }
    },
    right: {
        data:"c",
        left:{
            data:"f",
        },
        right:{
            data:"g",
            right: {
                data: "i",
            }
        }
    }
}
// 链式二叉树2， 先练习遍历
const tree2 = {
    data: "A",
    left: {
        data: "B",
        left:{
            data:"D"            
        },
        right:{
            data:"E"
        }
    },
    right: {
        data:"C",
        left:{
            data:"F",
        },
        right:{
            data:"G"           
        }
    }
}
// 前序遍历二叉树: : parent/left/right
function loopBinaryTree(tree){
    if(!tree){
        return;
    }
    console.log(tree.data);
    loopBinaryTree(tree.left)
    loopBinaryTree(tree.right)  
}

// 中序遍历: left/parent/right
function loopBinaryTree2(tree){
    if(!tree){
        return;
    }
    loopBinaryTree2(tree.left)
    console.log(tree.data);
    
    loopBinaryTree2(tree.right) 
}

// 后序遍历: left/right/ // 中序遍历: left/parent/right
function loopBinaryTree3(tree){
    if(!tree){
        return;
    }
    loopBinaryTree3(tree.left)
    loopBinaryTree3(tree.right) 
    console.log(tree.data);    
}

// 安层遍历二叉树
function levelLoop(tree){
    const queue = [];
    const result = [];
    queue.push(tree)
    while(queue.length >0) {
        let size = queue.length;
        const temp = [];
        for (let i=0; i< size; i++){
            const node  = queue.shift();
            temp.push(node.data)
            if(node.left){
                queue.push(node.left);
            }
            if(node.right){
                queue.push(node.right);
            }
        }
        result.push(temp)
        
    }
    console.log(result)
    return result;
}

// 安层遍历二叉树，再写一遍。
function levelLoop2(tree){
    if(!tree){
        return [];
    }
    const rst = [];
    const queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        let temp = [];
        let size = queue.length;
        for(let i=0; i< size; i ++){
            
            const node = queue.shift();
            temp.push(node.data);
            if(node.left){
                queue.push(node.left)
            }
            if(node.right) {
                queue.push(node.right);
            }
        }
        rst.push(temp);
    }

    return rst;
}

function test1(){
    levelLoop(tree2)
    console.log(levelLoop2(tree2))
}
function startTest(){
    test1();
}

startTest()
