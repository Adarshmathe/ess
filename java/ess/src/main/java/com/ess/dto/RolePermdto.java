package com.ess.dto;

import java.util.Date;

public class RolePermdto {
	private Long roleId;
	private String roleName;
	private boolean status;
	private Date createdOn;
	private int perId;
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
	public int getPerId() {
		return perId;
	}
	public void setPerId(int perId) {
		this.perId = perId;
	}
	@Override
	public String toString() {
		return "RolePermdto [roleId=" + roleId + ", roleName=" + roleName + ", status=" + status + ", createdOn="
				+ createdOn + ", perId=" + perId + "]";
	}
	
	

}
