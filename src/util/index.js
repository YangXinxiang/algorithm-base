/**
 * 创建一个表格（二维数组）
 * @param {*} rows 
 * @param {*} columns 
 * @param {*} defaultValue 
 * @returns 
 */
 function createTableArr(rows, columns, defaultValue =0){
    console.log(`createTableArr :: enter, rows = ${rows}, columns = ${columns}, defaultValue = ${defaultValue}`);
    const table = [];
    for(let i=0; i<rows; i++){
        const rowArr = new Array(columns)
        rowArr.fill(defaultValue)
        table.push(rowArr)
    }
    return table;
}

module.exports = {
    createTableArr,
}