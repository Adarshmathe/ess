package com.ess.daoQuery;

public interface RoledaoQuery {

	public static final String CREATE_ROLE = "INSERT INTO ROLES(ROLE_NAME,STATUS,createdOn)values(?,?,?);";
	public static final String UPDATE_ROLE = "UPDATE ROLES SET ROLE_NAME=?, STATUS=? WHERE ROLE_ID=?;";
	public static final String DELETE_ROLE = "DELETE FROM ROLES WHERE ROLE_ID=?;";
	public static final String GET_ROLE_BY_PK = "select r.role_id,r.role_name,r.status,r.createdon, p.per_id from roles r join role_permissions p on r.role_id= p.role_id WHERE r.ROLE_ID=?;";
	public static final String GET_ALL_ROLE = "SELECT * FROM ROLES;";
	public static final String GET_ROLE_COUNT = "SELECT COUNT(*) FROM ROLES;";
	public static final String GET_ROLE_STATUS = "SELECT STATUS FROM ROLES WHERE ROLE_ID=?;";

	public static final String LAST_INSERTED_ROLE_ID = "select MAX(ROLE_ID) FROM ROLES ";
	public static final String CREATE_ROLE_PERMISSION = "INSERT INTO ROLE_PERMISSIONS(ROLE_ID,PER_ID)values(?,?);";
	public static final String DELETE_ROLE_PERMISSION = "DELETE FROM ROLE_PERMISSIONS WHERE ROLE_ID = ?;";
	public static final String GET_ROLE_PERMISSION = "select p.module_name , p.controller_name ,p.action_name from role_permissions rp join permissions p on rp.per_id = p.id where rp.role_id=?;";

}
