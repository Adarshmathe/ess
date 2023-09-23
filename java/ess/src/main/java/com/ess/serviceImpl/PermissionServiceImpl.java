package com.ess.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ess.common.Exception.CommonMessage;
import com.ess.common.util.GenericResponse;
import com.ess.dao.Permissiondao;
import com.ess.dto.Permission;
import com.ess.service.PermissionService;

@Service
public class PermissionServiceImpl implements PermissionService{
	
	@Autowired
	private Permissiondao permissiondao;

	@Override
	public GenericResponse createPermission(Permission p) {
		int flag = 0;
		try {
			flag = permissiondao.createPermission(p);
			return new GenericResponse(CommonMessage.SUCCESS_CODE, "Permission CREATED", flag);
		} catch (Throwable e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "Permission NOT CREATED", flag);
		}
	}

	@Override
	public GenericResponse updatePermission(Permission p) {
		int flag = 0;
		try {
			flag = permissiondao.updatePermission(p);
			return new GenericResponse(CommonMessage.SUCCESS_CODE, "Permission UPDATED", flag);
		} catch (Throwable e) {
			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "Permission NOT UPDATED", flag);
		}
	}

	@Override
	public GenericResponse getallPermission() {
		try {
			List<Permission> permissions = permissiondao.getallPermission();
			if (!permissions.isEmpty()) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Permission list found", permissions);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Permission list not found", permissions);

			}
		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);

		}
	}

	@Override
	public GenericResponse deletePermission(long id) {
		try {
			int deleterole = permissiondao.deletePermission(id);
			if (deleterole > 0) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Permission Deleted", null);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Permission not deleted", null);

			}
		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);

		}
	}

}
