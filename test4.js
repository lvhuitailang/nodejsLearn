// let bf = Buffer.from('你','utf8');
//
// console.log(bf.length);
// console.log(bf.toString('hex'))

let fs = require('fs');

let fri = fs.createReadStream('./text.txt');
let fwi = fs.createWriteStream('./text2.txt');
fri.pipe(fwi);