let fs = require('fs');
let conf = require('./conf').conf;
let serviceImpl = function getServiceImpl(filename,basePackage,fields){
    let outputDir = conf.outdir_name;
    fs.mkdir(outputDir,(err)=>{
        if(err) return console.error(err);
    });


    let className = filename.split('.')[0];
    let firstLetterLowerCaseClassName = className.replace(className[0],className[0].toLowerCase());
    //package name
    let package = 'package '+basePackage+'.service.impl;\r\n\r\n'

    //annotation before class
    let classAnnotation = '\r\n\r\n@Service("'+firstLetterLowerCaseClassName+'Service")';

    //class head(0:head,1:tail !append to tail.)
    let classHead = ['\r\npublic class ' +
        className+
        'ServiceImpl  implements '+className+'Service  {\r\n','}\r\n'];

    //service autowired
    let autowired = '\t@Autowired\r\n' +
        '\tprivate ' +
        className+
        'Dao ' +
        firstLetterLowerCaseClassName+
        'Dao;\r\n\r\n'+
        '\tAutowired\r\n' +
        '\tprivate IAttachmentService attachmentService;\r\n\r\n\r\n'


    ;

    //fundAll,sub,toEdit,toDetails,del
    let findAll = findAllFun(className,firstLetterLowerCaseClassName);
    let sub = subFun(className,firstLetterLowerCaseClassName);
    let getById = getByIdFun(className,firstLetterLowerCaseClassName);
    let del = delFun(className,firstLetterLowerCaseClassName);


    fs.mkdir(outputDir+'/'+firstLetterLowerCaseClassName,(err,a)=>{
        let head = package+classAnnotation+classHead[0]+autowired;

        let tail = classHead[1];
        let dataS = head+findAll+sub+getById+del+tail;
        fs.writeFile(outputDir+'/'+firstLetterLowerCaseClassName+'/'+className+'ServiceImpl.java',dataS,(err)=>{
            if(err) return console.error(err);

        });





    });




};
function findAllFun(className,firstLetterLowerCaseClassName){

    let comment = '\t/**\r\n' +
        '\t* 分页查询\r\n' +
        '\t* @param param\r\n' +
        '\t* @param page\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';

    let findAll = '\t@Override\n' +
        '\t@Transactional(readOnly = true)\n' +
        '\tpublic PageDto findAll(List<QueryObj> param, PageDto page) {\n' +
        '\t\treturn '+firstLetterLowerCaseClassName+'Dao.findAll(param,page);\n' +
        '\t}\r\n\r\n';
    return comment+findAll;
}


function getByIdFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 根据id获取\r\n' +
        '\t* @param id\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let getById = '\t@Override\r\n' +
        '\t@Transactional(readOnly = true)\r\n' +
        '\tpublic '+className+' getById(String id) {\r\n' +
        '\t\t'+className+' '+firstLetterLowerCaseClassName+' = '+firstLetterLowerCaseClassName+'Dao.getEntity(id);\r\n' +
        '\t\tList<Attachment> attachments = attachmentService.getListByBillId(id);\r\n' +
        '\t\t'+firstLetterLowerCaseClassName+'.setAttachments(attachments);\r\n' +
        '\t\treturn '+firstLetterLowerCaseClassName+';\r\n' +
        '\t}\r\n\r\n';

    return comment+getById;


}

function delFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 删除\r\n' +
        '\t* @param id\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let del = '\t@Override\r\n' +
        '\t@Transactional(rollbackFor = RuntimeException.class)\r\n' +
        '\tpublic void del(String id) {\r\n' +
        '\t\t'+firstLetterLowerCaseClassName+'Dao.deleteEntity(id);\r\n' +
        '\t}\r\n\r\n';

    return comment+del;


}

function subFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 新增修改\r\n' +
        '\t* @param '+firstLetterLowerCaseClassName+'\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let sub = '\t@Override\r\n' +
        '\t@Transactional(rollbackFor = RuntimeException.class)\r\n' +
        '\tpublic '+className+' sub('+className+' '+firstLetterLowerCaseClassName+', EmployeeVo user) {\r\n' +
        '\t\t'+className+' saved = null;\r\n'+
        '\t\tif (ObjectHelper.isNotEmpty('+firstLetterLowerCaseClassName+'.getId())) {\n' +
        '\t\t\t'+className+' b = '+firstLetterLowerCaseClassName+'Dao.getEntity('+firstLetterLowerCaseClassName+'.getId());\r\n' +
        '\t\t\tBeanUtils.copyPropertiesToBean('+firstLetterLowerCaseClassName+',b);\r\n' +
        '\t\t\tsaved = '+firstLetterLowerCaseClassName+'Dao.updateEntity(b);\r\n' +
        '\t\t} else {\r\n' +
        '\t\t\tBeanUtils.setBean('+firstLetterLowerCaseClassName+',user);\r\n' +
        '\t\t\tsaved = '+firstLetterLowerCaseClassName+'Dao.save('+firstLetterLowerCaseClassName+');\r\n' +
        '\t\t}\r\n' +
        '\t\tif (ObjectHelper.isNotEmpty('+firstLetterLowerCaseClassName+'.getFileIds())) {\r\n' +
        '\t\t\tattachmentService.relationFileOnBillId('+firstLetterLowerCaseClassName+'.getFileIds(), '+firstLetterLowerCaseClassName+'.getId(), user);\r\n' +
        '\t\t}\r\n' +
        '\t\treturn saved;\r\n'+
        '\t}\r\n\r\n';

    return comment+sub;


}
module.exports.serviceImpl = serviceImpl;

