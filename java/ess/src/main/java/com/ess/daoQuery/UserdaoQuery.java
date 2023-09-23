package com.ess.daoQuery;

public interface UserdaoQuery {
	
	public static final String CREATE_USER = "INSERT INTO USERS(name,email,mobile,erp,designation,department,doj,manager_id,password,image,enabled,CREATED_ON)values(?,?,?,?,?,?,?,?,?,?,?,?);";
	public static final String CREATE_USER_ROLE = "INSERT INTO USERROLE(USER_ID,ROLE_ID)values(?,?);";
	public static final String UPDATE_USER = "UPDATE USERS SET NAME=?,ERP=?,DOJ=?,EMAIL=?,MOBILE=?,DESIGNATION=?,DEPARTMENT=?,MANAGER_ID=?,ENABLED=? WHERE ID=?;";
	public static final String DELETE_USER = "DELETE FROM USERS WHERE ID=?;";

	public static final String GET_USER_BY_PK = "select u.id,u.name,m.name as manager_name,u.email,u.mobile,u.erp,u.designation,u.department,u.doj,u.manager_id,u.image,u.enabled,u.created_on,r.role_id,role.role_name, role.createdon ,role.status from users u left join users m on u.manager_id = m.id join userrole r on u.id=r.user_id join roles role on r.role_id=role.role_id WHERE u.ID=?;";
	public static final String GET_ALL_USERS = "select u.id,u.name,m.name as manager_name,u.email,u.mobile,u.erp,u.designation,u.department,u.doj,u.manager_id,u.image,u.enabled,u.created_on,r.role_id,role.role_name, role.createdon ,role.status from users u left join users m on u.manager_id = m.id join userrole r on u.id=r.user_id join roles role on r.role_id=role.role_id ;";
	public static final String GET_USER_BY_ERP = "select u.id,u.name,m.name as manager_name,u.email,u.password,u.mobile,u.erp,u.designation,u.department,u.doj,u.manager_id,u.image,u.enabled,u.created_on,r.role_id,role.role_name, role.createdon ,role.status from users u left join users m on u.manager_id = m.id join userrole r on u.id=r.user_id join roles role on r.role_id=role.role_id WHERE u.ERP=?;";
	public static final String GET_ALLUSER_BYDATE = "select u.id,u.name,m.name as manager_name,u.email,u.mobile,u.erp,u.designation,u.department,u.doj,u.manager_id,u.image,u.enabled,u.created_on,r.role_id,role.role_name, role.createdon ,role.status from users u left join users m on u.manager_id = m.id join userrole r on u.id=r.user_id join roles role on r.role_id=role.role_id WHERE u.CREATED_ON BETWEEN ? AND ?;";
	
	public static final String GET_USERROLE_BY_USERID = "SELECT * FROM USERROLE WHERE USER_ID = ?;";
	public static final String UPDATE_USERROLE = "UPDATE USERROLE SET USER_ID =?,ROLE_ID =? WHERE ID=?;";
	public static final String DELETE_USERROLE = "DELETE FROM USERROLE WHERE USER_ID=?;";

	public static final String LAST_INSERTED_USER_ID = "select MAX(ID) FROM USERS ";

	public static final String GET_USER_COUNT = "SELECT COUNT(*) FROM USERS;";

	public static final String UPDATE_PROFILE_IMAGE = "UPDATE USERS SET IMAGE=? WHERE ID=?;";

	public static final String GET_USERS_TREE="with recursive user_list as (select pt0.id, pt0.manager_id, pt0.name, concat('http://localhost:8080/ess/user/view/', pt0.image)as image,0 AS level,'Owner' AS path from users pt0 where pt0.manager_id is null UNION ALL select pt1.id, pt1.manager_id,pt1.name,concat('http://localhost:8080/ess/user/view/', pt1.image) as image,(user_list.level + 1) as level,user_list.path || '/' || pt1.id from users pt1 inner join user_list on (pt1.manager_id = user_list.id )) select * from user_list order by level";

}
