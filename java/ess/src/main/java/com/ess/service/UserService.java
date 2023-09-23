package com.ess.service;

import java.text.ParseException;
import com.ess.common.util.GenericResponse;
import com.ess.dto.User;

public interface UserService {
	
	public GenericResponse createUser(User user);
	public GenericResponse updateuser(User user);
	public GenericResponse getallusers();
	public GenericResponse getusersCount();
	public GenericResponse deleteuser(long id);
	public GenericResponse getuserbyid(long id);
	public GenericResponse getByDate(String start , String end) throws ParseException;
	public GenericResponse getusersTree();

}

