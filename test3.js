let event = require('events');

let con = 'connect';//连接事件
let mr = 'msg_receive';//消息接收事件

let eventEmitter = new event.EventEmitter();

let conHandler = function(){
    console.log('连接成功');
    eventEmitter.emit(mr)
};
let msgReceiveHandler = function(){
    console.log('消息接收成功');
    console.log('程序结束');

};
eventEmitter.on(con,conHandler);
eventEmitter.on(mr,msgReceiveHandler);
//模拟首次触发连接事件
eventEmitter.emit(con);
