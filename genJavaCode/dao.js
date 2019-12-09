let fs = require('fs');
let conf = require('./conf').conf;
let dao = function getDao(filename,basePackage,fields){
    let outputDir = conf.outdir_name;
    fs.mkdir(outputDir,(err)=>{
        if(err) return console.error(err);
    });


    let className = filename.split('.')[0];
    let firstLetterLowerCaseClassName = className.replace(className[0],className[0].toLowerCase());
    //package name
    let package = 'package '+basePackage+'.dao;\r\n\r\n';

    //annotation before class
    let classAnnotation = '\r\n\r\n@Repository';

    //class head(0:head,1:tail !append to tail.)
    let classHead = ['\r\npublic class ' +
        className+
        'Dao extends ListSearchDaoUtil<'+className+'> {\r\n','}\r\n'];



    //fundAll,sub,toEdit,toDetails,del
    let findAll = findAllFun(className,firstLetterLowerCaseClassName,fields);


    fs.mkdir(outputDir+'/'+firstLetterLowerCaseClassName,(err,a)=>{
        let head = package+classHead[0];

        let tail = classHead[1];
        let dataS = head+findAll+tail;
        fs.writeFile(outputDir+'/'+firstLetterLowerCaseClassName+'/'+className+'Dao.java',dataS,(err)=>{
            if(err) return console.error(err);

        });





    });




};
function findAllFun(className,firstLetterLowerCaseClassName,fields){
    let comment = '\t/**\r\n' +
        '\t* 分页查询\r\n' +
        '\t* @param param\r\n' +
        '\t* @param page\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';

    let sqlAlias = firstLetterLowerCaseClassName[0];
    let findAll_top = '\tpublic PageDto findAll(List<QueryObj> param, PageDto page) {\r\n\r\n';
    let sql_start = '\t\tStringBuffer sql = new StringBuffer("select "\r\n';
    let sql_first = '\t\tsql.append(" '+sqlAlias+'.id,'+sqlAlias+'.flowState,'+sqlAlias+'.createTime,'+sqlAlias+'.createBy,'+sqlAlias+'.createByName,'+sqlAlias+'.updateTime,'+sqlAlias+'.updateBy,'+sqlAlias+'.updateByName ");';
    let sql_body = '\r\n\t\tsql.append(" ';
    for(let index = 0;index<fields.length;index++){
        let item = fields[index];
        if(index%8 == 0){
            sql_body += ' ");\r\n\t\tsql.append(" ';
            sql_body += ','+sqlAlias+'.'+item[Object.keys(item)[0]];
        }else{
            sql_body += ','+sqlAlias+'.'+item[Object.keys(item)[0]];

        }
    }
    sql_body += ' ");\r\n';
    sql_body += '\r\n\t\tsql.append("  from '+firstLetterLowerCaseClassName+' '+sqlAlias+' ");\r\n';



    let sql_end = '\t\treturn super.getListBySql(page, param, sql, new StringBuffer("order by '+sqlAlias+'.createTime desc"));\r\n';
    let findAll_btm = '\t}\r\n\r\n';

    let findAll = findAll_top+sql_start+sql_first+sql_body+sql_end+findAll_btm;
    return comment+findAll;
}

module.exports.dao = dao;

