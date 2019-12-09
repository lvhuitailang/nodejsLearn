package com.hysoft.assets.web.controller;



@Controller
@RequestMapping("/test")

public class TestController {
	@Autowired
	private TestService testService;

	Autowired
	private IPermissionEntityService permissionEntityServiceImpl;


	/**
	* 分页查询
	* @param request
	* @param page
	* @return
	*/
	@RequestMapping(value = "/findAll")
	@ResponseBody
	public String findAll(HttpServletRequest request, PageDto page) {
		String isChooser = request.getParameter("isChooser");
		List<QueryObj> param = ParameterUtil.getQueryObjByParameter(request, new String[] { "*" });
		try {
			if ("1".equals(isChooser)) {
				List<String> orgs = permissionEntityServiceImpl.getOrgsByDataRes(Test.class.getName());
				//BeanUtils.setParams(param, "a", orgs);
			} else {
				BeanUtils.setParamsByUserId(param, "a");
			}			PageDto pageDto = testService.findAll(param, page);
				LayUiPageDto uiPageDto = new LayUiPageDto(pageDto);
				return uiPageDto.toString();
			} catch (BusinessException e) {
					e.printStackTrace();
			}
			return null;
	}

	/**
	* 新增修改
	* @param request
	* @param test
	* @return
	*/
	@RequestMapping("/sub")
	@ResponseBody
	public Json sub(HttpServletRequest request, Test test) {
		Json json = new Json();
		try {
			EmployeeVo user = StoreHelper.currentEmp();
			Test saved = testService.sub(Test,user);
			json.setObj(saved);
			json.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(false);
		}
		return json;
	}

	/**
	* 跳转至编辑页面
	* @param request
	* @param id
	* @return
	*/
	@RequestMapping("/toEdit")
	public String toEdit(HttpServletRequest request, String id) {
		//return "assets/assets/test/testEdit";
	}

	/**
	* 跳转至详情页面
	* @param request
	* @param id
	* @return
	*/
	@RequestMapping("/toDetails")
	public String toDetails(HttpServletRequest request, String id) {
		//return "assets/assets/test/testDetails";
	}

	/**
	* 根据id获取
	* @param request
	* @param id
	* @return
	*/
	@RequestMapping("/getById")
	@ResponseBody
	public Test getById(String id) {
		Test test = testService.getById(id);
		return test;
	}

	/**
	* 删除
	* @param request
	* @param id
	* @return
	*/
	@RequestMapping("/del")
	@ResponseBody
	public Json del(HttpServletRequest request,String id) {
		Json json = new Json();
		testService.del(id);
		json.setSuccess(true);
		return json;
	}

}
