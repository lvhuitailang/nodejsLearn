let fs = require('fs');
let conf = require('./conf').conf;
let controller = require('./controller').controller;
let service = require('./service').service;
let serviceImpl = require('./serviceImpl').serviceImpl;
let dao = require('./dao').dao;
const dirname = conf.dirname;
//读取实体文件
//实体必须有domin包路径
fs.readdir(dirname,{encoding:'utf8'},(err,files)=>{
    if(err) return console.error(err);
    if(files.length == 0) return console.log('empty folder!');

    for(let filename of files){
        let fields = [];
        let basePackage = '';
        fs.readFile(dirname+'/'+filename,{encoding:'utf8',flag:'r'},(err,data)=>{
            if(err) return console.error(err);
            let entity = data.toString(encoding='utf8');
            //base package
            let fullPackage = entity.match(/package\s+(.*);/)[1];
            basePackage = fullPackage.split('.domain.')[0];

            //field
            let reg = /(?<=@Column.*(\r\n)+\s+)(\w.*)(?=;)/g;
            let fieldList = entity.match(reg);
            fieldList.map(item=>{
                let matched = item.match(/(\w+)/g);
                let type = matched[1];
                let field = matched[2];
                let obj = new Object();
                obj[type] = field;
                fields.push(obj);
            });
            controller(filename,basePackage,fields);
            service(filename,basePackage,fields);
            serviceImpl(filename,basePackage,fields);
            dao(filename,basePackage,fields);

        });

    }

});
