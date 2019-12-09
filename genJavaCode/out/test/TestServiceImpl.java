package com.hysoft.assets.service.impl;



@Service("testService")
public class TestServiceImpl  implements TestService  {
	@Autowired
	private TestDao testDao;

	Autowired
	private IAttachmentService attachmentService;


	/**
	* 分页查询
	* @param param
	* @param page
	* @return
	*/
	@Override
	@Transactional(readOnly = true)
	public PageDto findAll(List<QueryObj> param, PageDto page) {
		return testDao.findAll(param,page);
	}

	/**
	* 新增修改
	* @param test
	* @return
	*/
	@Override
	@Transactional(rollbackFor = RuntimeException.class)
	public Test sub(Test test, EmployeeVo user) {
		Test saved = null;
		if (ObjectHelper.isNotEmpty(test.getId())) {
			Test b = testDao.getEntity(test.getId());
			BeanUtils.copyPropertiesToBean(test,b);
			saved = testDao.updateEntity(b);
		} else {
			BeanUtils.setBean(test,user);
			saved = testDao.save(test);
		}
		if (ObjectHelper.isNotEmpty(test.getFileIds())) {
			attachmentService.relationFileOnBillId(test.getFileIds(), test.getId(), user);
		}
		return saved;
	}

	/**
	* 根据id获取
	* @param id
	* @return
	*/
	@Override
	@Transactional(readOnly = true)
	public Test getById(String id) {
		Test test = testDao.getEntity(id);
		List<Attachment> attachments = attachmentService.getListByBillId(id);
		test.setAttachments(attachments);
		return test;
	}

	/**
	* 删除
	* @param id
	* @return
	*/
	@Override
	@Transactional(rollbackFor = RuntimeException.class)
	public void del(String id) {
		testDao.deleteEntity(id);
	}

}
