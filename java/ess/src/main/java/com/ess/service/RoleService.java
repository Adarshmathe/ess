package com.ess.service;


import com.ess.common.util.GenericResponse;
import com.ess.dto.Role;

public interface RoleService {
	
	public GenericResponse createRole(Role role) throws Throwable;
	public GenericResponse updateRole(Role role) throws Throwable;
	public GenericResponse getallRole();
	public GenericResponse getRoleCount();
	public GenericResponse deleteRole(long id);
	public GenericResponse getRolebyid(long id);

}
