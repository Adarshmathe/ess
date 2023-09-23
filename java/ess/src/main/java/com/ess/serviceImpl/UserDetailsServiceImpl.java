package com.ess.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ess.daoImpl.RoledaoImpl;
import com.ess.daoQuery.UserdaoQuery;
import com.ess.dto.User;
import com.ess.globalExceptionHandler.CustomException;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RoledaoImpl Roledao;
	
	
	@Override
	public UserDetails loadUserByUsername(String erp) throws UsernameNotFoundException {
		
		User user =null;
		Boolean status =false;
		try {
			 user = jdbcTemplate.queryForObject(UserdaoQuery.GET_USER_BY_ERP, BeanPropertyRowMapper.newInstance(User.class),erp);
			 status = this.Roledao.getRoleStatus(user.getRole_id());

		} catch (EmptyResultDataAccessException e) {
			
		}
		
		if(user==null) {
			throw new CustomException("601","User not found..");
		}else if(user.isEnabled()== false){
			throw new CustomException("601","User is blocked");
		}else if(!status){
			throw new CustomException("601","User Role is blocked");
		}else {
			return user;
		}
		
		
	}
}
