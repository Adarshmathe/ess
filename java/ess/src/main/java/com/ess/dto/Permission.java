package com.ess.dto;

public class Permission {
	
	private Long id;
	private String moduleName; 
	private String controllerName; 
	private String actionName;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getControllerName() {
		return controllerName;
	}
	public void setControllerName(String controllerName) {
		this.controllerName = controllerName;
	}
	public String getActionName() {
		return actionName;
	}
	public void setActionName(String actionName) {
		this.actionName = actionName;
	} 
	
	

}
