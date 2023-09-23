package com.ess.service;

import com.ess.common.util.GenericResponse;
import com.ess.dto.Permission;

public interface PermissionService {

	public GenericResponse createPermission(Permission role);
	public GenericResponse updatePermission(Permission role);
	public GenericResponse getallPermission();
	public GenericResponse deletePermission(long id);
}
