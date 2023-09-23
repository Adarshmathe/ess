package com.ess.dto;


public class UserTree {
	
	private Long id;
	private Long manager_id;
	private String name;
	private int level;
	private String path;
	private String image;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getManager_id() {
		return manager_id;
	}
	public void setManager_id(Long manager_id) {
		this.manager_id = manager_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	

}
