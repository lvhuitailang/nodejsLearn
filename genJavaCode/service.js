let fs = require('fs');
let conf = require('./conf').conf;
let service = function getService(filename,basePackage,fields){
    let outputDir = conf.outdir_name;
    fs.mkdir(outputDir,(err)=>{
        if(err) return console.error(err);
    });


    let className = filename.split('.')[0];
    let firstLetterLowerCaseClassName = className.replace(className[0],className[0].toLowerCase());
    //package name
    let package = 'package '+basePackage+'.service;\r\n\r\n';


    //class head(0:head,1:tail !append to tail.)
    let classHead = ['\r\npublic interface ' +
        className+
        'Service {\r\n','}\r\n'];



    //fundAll,sub,toEdit,toDetails,del
    let findAll = findAllFun(className,firstLetterLowerCaseClassName);
    let getById = getByIdFun(className,firstLetterLowerCaseClassName);
    let del = delFun(className,firstLetterLowerCaseClassName);
    let sub = subFun(className,firstLetterLowerCaseClassName);


    fs.mkdir(outputDir+'/'+firstLetterLowerCaseClassName,(err,a)=>{
        let head = package+classHead[0];

        let tail = classHead[1];
        let dataS = head+findAll+getById+del+sub+tail;
        fs.writeFile(outputDir+'/'+firstLetterLowerCaseClassName+'/'+className+'Service.java',dataS,(err)=>{
            if(err) return console.error(err);

        });





    });




};
function findAllFun(className,firstLetterLowerCaseClassName){

    let comment = '\t/**\r\n' +
        '\t* 分页查询\r\n' +
        '\t* @param request\r\n' +
        '\t* @param page\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';

    let findAll = '\tPageDto findAll(List<QueryObj> param, PageDto page);\r\n\r\n';
    return comment+findAll;
}

function delFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 删除\r\n' +
        '\t* @param id\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let del = '\tvoid del(String id);\r\n\r\n';

    return comment+del;


}

function getByIdFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 根据id获取\r\n' +
        '\t* @param id\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let getById = '\t'+className+' getById(String id);\r\n\r\n';

    return comment+getById;


}

function subFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 提交\r\n' +
        '\t* @param '+firstLetterLowerCaseClassName+'\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let sub = '\t'+className+' sub('+className+' '+firstLetterLowerCaseClassName+',EmployeeVo user);\r\n\r\n';

    return comment+sub;


}

module.exports.service = service;

