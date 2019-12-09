package com.hysoft.assets.dao;


public class TestDao extends ListSearchDaoUtil<Test> {
	/**
	* 分页查询
	* @param param
	* @param page
	* @return
	*/
	public PageDto findAll(List<QueryObj> param, PageDto page) {

		StringBuffer sql = new StringBuffer("select "
		sql.append(" t.id,t.flowState,t.createTime,t.createBy,t.createByName,t.updateTime,t.updateBy,t.updateByName ");
		sql.append("  ");
		sql.append(" ,t.contractId,t.fileIds ");

		sql.append("  from test t ");
		return super.getListBySql(page, param, sql, new StringBuffer("order by t.createTime desc"));
	}

}
