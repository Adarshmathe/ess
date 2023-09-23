package com.ess.daoImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ess.dao.Roledao;
import com.ess.daoQuery.RoledaoQuery;
import com.ess.dto.Permission;
import com.ess.dto.Role;
import com.ess.dto.RolePermdto;
import com.ess.dto.RolePermission;
@Repository
public class RoledaoImpl implements Roledao{
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public int createRole(Role role) {
		
		int flag = jdbcTemplate.update(RoledaoQuery.CREATE_ROLE,role.getRoleName(),role.isStatus(),role.getCreatedOn());
			 
		if(flag>0) {
			 return jdbcTemplate.queryForObject(RoledaoQuery.LAST_INSERTED_ROLE_ID,Integer.class);

		}
		return 0;
	}

	@Override
	public int updateRole(Role role) {
		
		int flag = jdbcTemplate.update(RoledaoQuery.UPDATE_ROLE,role.getRoleName(),role.isStatus(),role.getRoleId());
		 
		return flag;
	}

	@Override
	public List<Role> getallRole() {
	 List<Role> roles = jdbcTemplate.query(RoledaoQuery.GET_ALL_ROLE, BeanPropertyRowMapper.newInstance(Role.class));
		 
		return roles;
		
	}

	@Override
	public int deleteRole(long id) {
		int flag = jdbcTemplate.update(RoledaoQuery.DELETE_ROLE,id);
		 
		return flag;
	}

	@Override
	public List<RolePermdto> getRolebyid(long id) {
		 List<RolePermdto> role =null;
	  try {
		  role = jdbcTemplate.query(RoledaoQuery.GET_ROLE_BY_PK,BeanPropertyRowMapper.newInstance(RolePermdto.class),id);

		} catch (EmptyResultDataAccessException e) {
			e.printStackTrace();
		}
		return role;
	}

	@Override
	public int getRoleCount() {
		int count = jdbcTemplate.queryForObject(RoledaoQuery.GET_ROLE_COUNT, Integer.class);
		 
		return count;
	}

	@Override
	public int createRolePermission(RolePermission rp) {
		int flag = jdbcTemplate.update(RoledaoQuery.CREATE_ROLE_PERMISSION,rp.getRoleId(),rp.getPermissionId());
		 
		return flag;
	}

	@Override
	public void deleteRolePermission(Long id) {
		jdbcTemplate.update(RoledaoQuery.DELETE_ROLE_PERMISSION,id);
		
	}

	@Override
	public List<Permission> getRolePermission(Long id) {
		
		 List<Permission> permissions =null;
		  try {
			  permissions = jdbcTemplate.query(RoledaoQuery.GET_ROLE_PERMISSION,BeanPropertyRowMapper.newInstance(Permission.class),id);

			} catch (EmptyResultDataAccessException e) {
			}
			return permissions;
		}

	@Override
	public Boolean getRoleStatus(Long id) {
		return jdbcTemplate.queryForObject(RoledaoQuery.GET_ROLE_STATUS, Boolean.class,id);
		 
		
	}
	

}
