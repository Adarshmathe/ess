package com.ess.dao;

import java.util.List;

import com.ess.dto.Permission;

public interface Permissiondao {
	
	 int createPermission(Permission p);
	 int updatePermission(Permission p);
	 List<Permission> getallPermission();
	 int deletePermission(long id);

}
