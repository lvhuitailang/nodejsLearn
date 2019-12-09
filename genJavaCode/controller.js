let fs = require('fs');
let conf = require('./conf').conf;
let controller = function getController(filename,basePackage,fields){
    let outputDir = conf.outdir_name;
    fs.mkdir(outputDir,(err)=>{
        if(err) return console.error(err);
    });


    let className = filename.split('.')[0];
    let firstLetterLowerCaseClassName = className.replace(className[0],className[0].toLowerCase());
    //package name
    let package = 'package '+basePackage+'.web.controller;\r\n\r\n'

    //annotation before class
    let classAnnotation = '\r\n\r\n@Controller\r\n' +
        '@RequestMapping("/' +
        firstLetterLowerCaseClassName+
        '")\r\n';

    //class head(0:head,1:tail !append to tail.)
    let classHead = ['\r\npublic class ' +
        className+
        'Controller {\r\n','}\r\n'];

    //service autowired
    let autowired = '\t@Autowired\r\n' +
        '\tprivate ' +
        className+
        'Service ' +
        firstLetterLowerCaseClassName+
        'Service;\r\n\r\n'+
        '\tAutowired\r\n' +
        '\tprivate IPermissionEntityService permissionEntityServiceImpl;\r\n\r\n\r\n'


    ;

    //fundAll,sub,toEdit,toDetails,del
    let findAll = findAllFun(className,firstLetterLowerCaseClassName);
    let sub = subFun(className,firstLetterLowerCaseClassName);
    let toEdit = toEditFun(className,firstLetterLowerCaseClassName);
    let toDetails = toDetailsFun(className,firstLetterLowerCaseClassName);
    let getById = getByIdFun(className,firstLetterLowerCaseClassName);
    let del = delFun(className,firstLetterLowerCaseClassName);


    fs.mkdir(outputDir+'/'+firstLetterLowerCaseClassName,(err,a)=>{
        let head = package+classAnnotation+classHead[0]+autowired;

        let tail = classHead[1];
        let dataS = head+findAll+sub+toEdit+toDetails+getById+del+tail;
        fs.writeFile(outputDir+'/'+firstLetterLowerCaseClassName+'/'+className+'Controller.java',dataS,(err)=>{
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

    let findAll = '\t@RequestMapping(value = "/findAll")\r\n' +
        '\t@ResponseBody\r\n'+
        '\tpublic String findAll(HttpServletRequest request, PageDto page) {\r\n'+
        '\t\tString isChooser = request.getParameter("isChooser");\r\n'+
        '\t\tList<QueryObj> param = ParameterUtil.getQueryObjByParameter(request, new String[] { "*" });\r\n'+
        '\t\ttry {\r\n' +
        '\t\t\tif ("1".equals(isChooser)) {\r\n'+
        '\t\t\t\tList<String> orgs = permissionEntityServiceImpl.getOrgsByDataRes('+className+'.class.getName());\r\n'+
        '\t\t\t\t//BeanUtils.setParams(param, "a", orgs);\r\n'+
        '\t\t\t} else {\r\n' +
        '\t\t\t\tBeanUtils.setParamsByUserId(param, "a");\r\n' +
        '\t\t\t}'+
        '\t\t\tPageDto pageDto = '+firstLetterLowerCaseClassName+'Service.findAll(param, page);\n' +
        '\t\t\t\tLayUiPageDto uiPageDto = new LayUiPageDto(pageDto);\n' +
        '\t\t\t\treturn uiPageDto.toString();\n' +
        '\t\t\t} catch (BusinessException e) {\n' +
        '\t\t\t\t\te.printStackTrace();\n' +
        '\t\t\t}\n' +
        '\t\t\treturn null;\n' +
        '\t}\r\n\r\n';
    return comment+findAll;
}

function toEditFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 跳转至编辑页面\r\n' +
        '\t* @param request\r\n' +
        '\t* @param id\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let toEdit = '\t@RequestMapping("/toEdit")\r\n' +
        '\tpublic String toEdit(HttpServletRequest request, String id) {\r\n' +
        '\t\t//return "assets/assets/'+firstLetterLowerCaseClassName+'/'+firstLetterLowerCaseClassName+'Edit";\r\n' +
        '\t}\r\n\r\n';

    return comment+toEdit;


}

function toDetailsFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 跳转至详情页面\r\n' +
        '\t* @param request\r\n' +
        '\t* @param id\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let toDetails = '\t@RequestMapping("/toDetails")\r\n' +
        '\tpublic String toDetails(HttpServletRequest request, String id) {\r\n' +
        '\t\t//return "assets/assets/'+firstLetterLowerCaseClassName+'/'+firstLetterLowerCaseClassName+'Details";\r\n' +
        '\t}\r\n\r\n';

    return comment+toDetails;


}

function getByIdFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 根据id获取\r\n' +
        '\t* @param request\r\n' +
        '\t* @param id\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let getById = '\t@RequestMapping("/getById")\r\n' +
        '\t@ResponseBody\r\n'+
        '\tpublic '+className+' getById(String id) {\n' +
        '\t\t'+className+' '+firstLetterLowerCaseClassName+' = '+firstLetterLowerCaseClassName+'Service.getById(id);\n' +
        '\t\treturn '+firstLetterLowerCaseClassName+';\n' +
        '\t}\r\n\r\n';

    return comment+getById;


}

function delFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 删除\r\n' +
        '\t* @param request\r\n' +
        '\t* @param id\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let del = '\t@RequestMapping("/del")\r\n' +
        '\t@ResponseBody\r\n'+
        '\tpublic Json del(HttpServletRequest request,String id) {\n' +
        '\t\tJson json = new Json();\n' +
        '\t\t'+firstLetterLowerCaseClassName+'Service.del(id);\n' +
        '\t\tjson.setSuccess(true);\n' +
        '\t\treturn json;\n' +
        '\t}\r\n\r\n';

    return comment+del;


}

function subFun(className,firstLetterLowerCaseClassName){
    let comment = '\t/**\r\n' +
        '\t* 新增修改\r\n' +
        '\t* @param request\r\n' +
        '\t* @param '+firstLetterLowerCaseClassName+'\r\n' +
        '\t* @return\r\n' +
        '\t*/\r\n';
    let sub = '\t@RequestMapping("/sub")\r\n' +
        '\t@ResponseBody\r\n'+
        '\tpublic Json sub(HttpServletRequest request, '+className+' '+firstLetterLowerCaseClassName+') {\r\n' +
        '\t\tJson json = new Json();\r\n' +
        '\t\ttry {\r\n' +
        '\t\t\tEmployeeVo user = StoreHelper.currentEmp();\r\n' +
        '\t\t\t'+className+' saved = '+firstLetterLowerCaseClassName+'Service.sub('+className+',user);\r\n' +
        '\t\t\tjson.setObj(saved);\r\n' +
        '\t\t\tjson.setSuccess(true);\r\n' +
        '\t\t} catch (Exception e) {\r\n' +
        '\t\t\te.printStackTrace();\r\n' +
        '\t\t\tjson.setSuccess(false);\r\n' +
        '\t\t}\n' +
        '\t\treturn json;\r\n'+
        '\t}\r\n\r\n';

    return comment+sub;


}
module.exports.controller = controller;

