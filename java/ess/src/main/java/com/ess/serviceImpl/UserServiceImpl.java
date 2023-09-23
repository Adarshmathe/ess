package com.ess.serviceImpl;

import java.text.ParseException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ess.common.Exception.CommonMessage;
import com.ess.common.util.GenericResponse;
import com.ess.daoImpl.userdaoImpl;
import com.ess.dto.User;
import com.ess.dto.UserTree;
import com.ess.globalExceptionHandler.CustomException;
import com.ess.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private userdaoImpl userdaoImpl;

	@Override
	public GenericResponse createUser(User user) {

		int flag = 0;
		try {
			flag = userdaoImpl.createUser(user);
			return new GenericResponse(CommonMessage.SUCCESS_CODE, "USER CREATED", flag);
		} catch (CustomException e) {
			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, e.getErrormessage(), flag);
		}

	}

	@Override
	public GenericResponse updateuser(User user) {

		int flag = 0;
		try {
			flag = userdaoImpl.updateuser(user);
			return new GenericResponse(CommonMessage.SUCCESS_CODE, "USER UPDATED", flag);
		} catch (CustomException e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, e.getErrormessage(), flag);
		}

	}

	@Override
	public GenericResponse getallusers() {

		try {
			List<User> getallusers = userdaoImpl.getallusers();
			
			System.out.println(getallusers);
			
			if (getallusers != null) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "SUCCESS", getallusers);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Empty List", getallusers);

			}
		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);

		}
	}

	@Override
	public GenericResponse deleteuser(long id) {

		try {
			int deleteuser = userdaoImpl.deleteuser(id);
			if (deleteuser > 0) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "User Deleted", null);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "User Not Found", null);

			}
		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);

		}

	}

	@Override
	public GenericResponse getuserbyid(long id) {

		try {
			User getuserbyid = userdaoImpl.getuserbyid(id);
			
			if (getuserbyid != null) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "User found", getuserbyid);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "User not found", getuserbyid);

			}

		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);
		}

	}

	@Override
	public GenericResponse getByDate(String start, String end) throws ParseException {

		try {
			List<User> byDate = userdaoImpl.getByDate(start, end);
			if (byDate != null) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "UserList found", byDate);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "UserList not found", byDate);

			}

		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "User found", null);

		}

	}

	@Override
	public GenericResponse getusersCount() {
		try {
			int count = userdaoImpl.getusersCount();
				
			if (count != 0) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "SUCCESS", count);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Empty List", count);

			}
		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);

		}
	}

	@Override
	public GenericResponse getusersTree() {
		try {
			List<UserTree> getallusers = userdaoImpl.getusersTree();
						
			if (getallusers != null) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "SUCCESS", getallusers);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Empty List", getallusers);

			}
		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);

		}
	}

}
