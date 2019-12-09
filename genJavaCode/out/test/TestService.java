package com.hysoft.assets.service;


public interface TestService {
	/**
	* 分页查询
	* @param request
	* @param page
	* @return
	*/
	PageDto findAll(List<QueryObj> param, PageDto page);

	/**
	* 根据id获取
	* @param id
	* @return
	*/
	Test getById(String id);

	/**
	* 删除
	* @param id
	* @return
	*/
	void del(String id);

	/**
	* 提交
	* @param test
	* @return
	*/
	Test sub(Test test,EmployeeVo user);

}
