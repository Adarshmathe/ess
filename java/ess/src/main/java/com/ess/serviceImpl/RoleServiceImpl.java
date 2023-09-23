package com.ess.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ess.common.Exception.CommonMessage;
import com.ess.common.util.GenericResponse;
import com.ess.daoImpl.RoledaoImpl;
import com.ess.dto.Role;
import com.ess.dto.RolePermdto;
import com.ess.dto.RolePermission;
import com.ess.service.RoleService;
@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoledaoImpl Roledao;
	
	@Override
	public GenericResponse createRole(Role role) throws Throwable {
		Long roleId = 0L;
		try {
			roleId = (long) Roledao.createRole(role);
			for(RolePermission rp : role.getRolePermissionList()) {
				rp.setRoleId(roleId);
				Roledao.createRolePermission(rp);
			}
			
			
			return new GenericResponse(CommonMessage.SUCCESS_CODE, "ROLE CREATED", roleId);
		} catch (Throwable e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "ROLE NOT CREATED", roleId);
		}
	}

	@Override
	public GenericResponse updateRole(Role role) throws Throwable {
		Long roleId = 0L;

		try {
			roleId = (long) Roledao.updateRole(role);
			  
			Roledao.deleteRolePermission(role.getRoleId());
			
			for(RolePermission rp : role.getRolePermissionList()) {
				rp.setRoleId(role.getRoleId());
				Roledao.createRolePermission(rp);
			}
			return new GenericResponse(CommonMessage.SUCCESS_CODE, "ROLE UPDATED", roleId);
		} catch (Throwable e) {
			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "ROLE NOT UPDATED", roleId);
		}
	}

	@Override
	public GenericResponse getallRole() {
		try {
			List<Role> roles = Roledao.getallRole();
			if (roles != null) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "SUCCESS", roles);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Empty List", roles);

			}
		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);

		}
	}

	@Override
	public GenericResponse deleteRole(long id) {
		try {
			int deleterole = Roledao.deleteRole(id);

			if (deleterole > 0) {
				 Roledao.deleteRolePermission(id);
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Role Deleted", null);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "SOMETHING WENT WRONG", null);

			}
		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);

		}
	}

	@Override
	public GenericResponse getRolebyid(long id) {
		try {
			List<RolePermdto> role = Roledao.getRolebyid(id);
			if (role != null) {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Role found", role);

			} else {
				return new GenericResponse(CommonMessage.SUCCESS_CODE, "Role not found", role);

			}

		} catch (Exception e) {

			e.printStackTrace();
			return new GenericResponse(CommonMessage.FAILURE_CODE, "SOMETHING WENT WRONG", null);
		}
	}

	@Override
	public GenericResponse getRoleCount() {
		try {
			int count = Roledao.getRoleCount();
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

}
