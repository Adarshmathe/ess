package com.ess.daoImpl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ess.dao.userdao;
import com.ess.daoQuery.UserdaoQuery;
import com.ess.dto.User;
import com.ess.dto.UserRole;
import com.ess.dto.UserTree;
import com.ess.globalExceptionHandler.CustomException;

@Repository
public class userdaoImpl implements userdao {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public int createUser(User user) {
		
		int flag1 =0;
		User user1 =null;
		
		try {
			 user1 = jdbcTemplate.queryForObject(UserdaoQuery.GET_USER_BY_ERP, BeanPropertyRowMapper.newInstance(User.class),user.getErp());

		} catch (EmptyResultDataAccessException e) {
//			e.printStackTrace();
		}
		if(user1 != null) {
			System.out.println("Erp Id already Present...");
			throw new CustomException("601","ERP ID already exist");
		}else {
			
			Object [] arr = new Object[12];
			
			
			arr[0] = user.getName();
			arr[1] = user.getEmail();
			arr[2] = user.getMobile();
			arr[3] = user.getErp();
			arr[4] = user.getDesignation();
			arr[5] = user.getDepartment();
			arr[6] = user.getDoj();
			arr[7] = user.getManager_id()==null?null:user.getManager_id();
			arr[8] = user.getPassword();
			arr[9] = user.getImage();
			arr[10] = user.isEnabled();
			arr[11] = user.getCreatedOn();
			
	
			
			 int flag = jdbcTemplate.update(UserdaoQuery.CREATE_USER,arr);
			 if(flag>0) {
				 Integer queryForObject = jdbcTemplate.queryForObject(UserdaoQuery.LAST_INSERTED_USER_ID,Integer.class);

				 Object [] arr1 = new Object[2];		
					arr1[0] = queryForObject;
					arr1[1] = user.getRole_id();
					
				 flag1 = jdbcTemplate.update(UserdaoQuery.CREATE_USER_ROLE,arr1);
				 
			 }

		}
		
		return flag1;
	}

	@Override
	public int updateuser(User user) {
		User user1 =null;
		try {
			user1 = jdbcTemplate.queryForObject(UserdaoQuery.GET_USER_BY_ERP, BeanPropertyRowMapper.newInstance(User.class),user.getErp());

		} catch (EmptyResultDataAccessException e) {
//			e.printStackTrace();
		}
		
		int flag1 =0;
		
		if(user1==null) {
			
			 UserRole userRole = jdbcTemplate.queryForObject(UserdaoQuery.GET_USERROLE_BY_USERID, BeanPropertyRowMapper.newInstance(UserRole.class),user.getId());
		 
			 Object [] arr = new Object[10];
				
					arr[0] = user.getName();
					arr[1] = user.getErp();
					arr[2] = user.getDoj();
					arr[3] = user.getEmail();
					arr[4] = user.getMobile();
					arr[5] = user.getDesignation();
					arr[6] = user.getDepartment();
					arr[7] = user.getManager_id();
					arr[8] = user.isEnabled();
					arr[9] = user.getId();
				
				 int flag = jdbcTemplate.update(UserdaoQuery.UPDATE_USER,arr);
				 if(flag>0) {
					 
					 Object [] arr1 = new Object[3];	
						arr1[0] = user.getId();
						arr1[1] = user.getRole_id();
					 	arr1[2] = userRole.getId();
					 
					 flag1 = jdbcTemplate.update(UserdaoQuery.UPDATE_USERROLE,arr1);
				 }
		}else if(user.getId()==user1.getId()) {
			UserRole userRole = jdbcTemplate.queryForObject(UserdaoQuery.GET_USERROLE_BY_USERID, BeanPropertyRowMapper.newInstance(UserRole.class),user.getId());
			 
			 Object [] arr = new Object[10];
				
			 	arr[0] = user.getName();
				arr[1] = user.getErp();
				arr[2] = user.getDoj();
				arr[3] = user.getEmail();
				arr[4] = user.getMobile();
				arr[5] = user.getDesignation();
				arr[6] = user.getDepartment();
				arr[7] = user.getManager_id();
				arr[8] = user.isEnabled();
				arr[9] = user.getId();
				
				 flag1 = jdbcTemplate.update(UserdaoQuery.UPDATE_USER,arr);
				 if(flag1>0) {
					 
					 Object [] arr1 = new Object[3];					
						arr1[0] = user.getId();
						arr1[1] = user.getRole_id();
					 	arr1[2] = userRole.getId();
					 
					 flag1 = jdbcTemplate.update(UserdaoQuery.UPDATE_USERROLE,arr1);
				 }
		}else {

				throw new CustomException("601","Erp ID already exist");
		}
		return flag1;
	}

	@Override
	public List<User> getallusers() {
		List<User> users =null;
	try {
		 users = jdbcTemplate.query(UserdaoQuery.GET_ALL_USERS, BeanPropertyRowMapper.newInstance(User.class));

	} catch (EmptyResultDataAccessException e) {
	}

		return users;
	}

	@Override
	public int deleteuser(long id) {
		
		int flag1 = 0;
		int flag = jdbcTemplate.update(UserdaoQuery.DELETE_USER,id);
		
		if(flag>0) {
			flag1 = jdbcTemplate.update(UserdaoQuery.DELETE_USERROLE,id);

		}
		return flag1;
	}

	@Override
	public User getuserbyid(long id) {
		User user =null;
		
		try {
			user = jdbcTemplate.queryForObject(UserdaoQuery.GET_USER_BY_PK, BeanPropertyRowMapper.newInstance(User.class),id);

		} catch (EmptyResultDataAccessException e) {
		}

		
		
		return user;
	}

	@Override
	public User getuserbyErp(String erp) {
		User user =null;
		try {
			user = jdbcTemplate.queryForObject(UserdaoQuery.GET_USER_BY_ERP, BeanPropertyRowMapper.newInstance(User.class),erp);

		} catch (EmptyResultDataAccessException e) {
		}
		
		
		return user;
	}

	@Override
	public List<User> getByDate(String start, String end) throws ParseException {
		 List<User> users =null;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date start1 = simpleDateFormat.parse(start);
		Date end1 = simpleDateFormat.parse(end);
		
	 try {
		 users = jdbcTemplate.query(UserdaoQuery.GET_ALLUSER_BYDATE, BeanPropertyRowMapper.newInstance(User.class),start1,end1);

		} catch (EmptyResultDataAccessException e) {
		}
		
		return users;
	}
	
	

	@Override
	public int getusersCount() {
		int count =0;
		try {
			 count = jdbcTemplate.queryForObject(UserdaoQuery.GET_USER_COUNT, Integer.class);

		} catch (EmptyResultDataAccessException e) {
		}

			return count;
		}
	
	@Override
	public int updateProfileImage(String imagename, Long id) {

		int flag = jdbcTemplate.update(UserdaoQuery.UPDATE_PROFILE_IMAGE,imagename,id);
				 
		return flag;
	}

	public List<UserTree> getusersTree() {
		List<UserTree> UserTree =null;
		try {
			UserTree = jdbcTemplate.query(UserdaoQuery.GET_USERS_TREE, BeanPropertyRowMapper.newInstance(UserTree.class));
			
		} catch (EmptyResultDataAccessException e) {
		}

			return UserTree;
	}
	

}
