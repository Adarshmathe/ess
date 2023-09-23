package com.ess.dao;

import java.util.List;

import com.ess.dto.Permission;
import com.ess.dto.Role;
import com.ess.dto.RolePermdto;
import com.ess.dto.RolePermission;

public interface Roledao {

	public int createRole(Role role) throws Throwable;
	public int updateRole(Role role) throws Throwable;
	public List<Role> getallRole();
	public int getRoleCount();
	public int deleteRole(long id);
	public List<RolePermdto> getRolebyid(long id);
	public int createRolePermission(RolePermission rp);
	public void deleteRolePermission(Long id);
	public List<Permission> getRolePermission(Long id);
	public Boolean getRoleStatus(Long id);




}
