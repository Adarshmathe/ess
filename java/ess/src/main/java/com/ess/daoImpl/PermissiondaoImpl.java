package com.ess.daoImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ess.dao.Permissiondao;
import com.ess.daoQuery.PermissionQuery;
import com.ess.dto.Permission;

@Repository
public class PermissiondaoImpl implements Permissiondao{
	
	@Autowired
	private JdbcTemplate jdbcTemplate;


	@Override
	public int createPermission(Permission p) {
		
		 Object [] arr = new Object[3];
			arr[0] = p.getModuleName();
			arr[1] = p.getControllerName();
			arr[2] = p.getActionName();
			
			int flag = jdbcTemplate.update(PermissionQuery.CREATE_PERMISSION,arr);

        return flag;
	}

	@Override
	public int updatePermission(Permission p) {
		 Object [] arr = new Object[4];
			arr[0] = p.getModuleName();
			arr[1] = p.getControllerName();
			arr[2] = p.getActionName();
			arr[3] = p.getId();
			
			int flag = jdbcTemplate.update(PermissionQuery.UPDATE_PERMISSION,arr);

     return flag;
	}

	@Override
	public List<Permission> getallPermission() {
		try {
			
			List<Permission> permissionList = jdbcTemplate.query(PermissionQuery.PERMISSION_LIST_ALL, 
				BeanPropertyRowMapper.newInstance(Permission.class));
			return permissionList;
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}

	@Override
	public int deletePermission(long id) {
		int flag = jdbcTemplate.update(PermissionQuery.DELETE_PERMISSION,id);
		 
		return flag;
	}

}
