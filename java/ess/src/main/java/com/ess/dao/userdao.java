package com.ess.dao;

import java.text.ParseException;
import java.util.List;
import com.ess.dto.User;

public interface userdao {
	
	public int createUser(User user) throws Throwable;
	public int updateuser(User user) throws Throwable;
	public List<User> getallusers();
	public int getusersCount();
	public int deleteuser(long id);
	public User getuserbyid(long id);
	public User getuserbyErp(String erp);
	public List<User> getByDate(String start , String end) throws ParseException;
	int updateProfileImage(String imagename, Long id);

}
