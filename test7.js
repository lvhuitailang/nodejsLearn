console.log(__filename);
console.log(__dirname);
console.trace();
global.process.on('exit',function(code){
    console.log('程序退出...');
    console.log('退出代码:'+code)
});