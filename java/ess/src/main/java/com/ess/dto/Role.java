package com.ess.dto;

import java.util.Date;
import java.util.List;

public class Role {

	private Long roleId;
	private String roleName;
	private boolean status;
	private Date createdOn;
	private List<RolePermission> rolePermissionList; 

	
	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	
	public List<RolePermission> getRolePermissionList() {
		return rolePermissionList;
	}

	public void setRolePermissionList(List<RolePermission> rolePermissionList) {
		this.rolePermissionList = rolePermissionList;
	}
	
}
