let fs = require('fs');
//同步
/*let data = fs.readFileSync('text.txt');
console.log(data.toString())
console.log('程序执行结束');*/

//异步
let data2 = fs.readFile('text.txt',(err,data)=>{
   if (err) return console.error(err);
   else console.log(data.toString())
});
console.log('程序执行结束');

