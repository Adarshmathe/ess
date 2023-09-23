export class PermissionList{
    id:number;
    moduleName:string;
    controllerName:string;
    actionName:string;

    constructor(){
        this.id = 0;
        this.moduleName ="";
        this.controllerName = "";
        this.actionName = "";
    }
}

export class Node1
{
    id : number;
    name : string;
    status : any;
    parent : Node1;
    children : Node1[];
    constructor(name : string,status:any,parent:Node1)
    {
        this.name = name;
        this.status = status;
        this.parent = parent;
        this.children = [];
        this.id = 0;
    }
}

export class RolePermissionList
{
    permissionId : number;
}

export class RolePerm
{
     roleId: Number;
	 roleName :string;
	 status : Boolean;
	 createdOn :Date;
	 perId :Number;
}

/////user permission

export class MenuPermissionClass {
   
    ItPermission: ItPermission;
    HrPermission: HrPermission;
    UserManagementPermission: UserManagementPermission;
    isUserManagementPermission: boolean;
    isProfilePermission: boolean;
    isCircularPermission: boolean;

    constructor() {
        this.ItPermission = new ItPermission();
        this.HrPermission = new HrPermission();
        this.UserManagementPermission = new UserManagementPermission();       
        this.isUserManagementPermission = false;
        this.isProfilePermission = false;
        this.isCircularPermission = false;
    }
}

export class ItPermission {
    upload: boolean;
    view: boolean;
    
    constructor() {
        this.upload = false;
        this.view = false;
    }
}

export class HrPermission {
    upload: boolean;
    view: boolean;
    
    constructor() {
        this.upload = false;
        this.view = false;
    }
}

export class UserManagementPermission {
    role: boolean;
    user: boolean;
    permission: boolean;

    constructor() {
        this.role = false;
        this.user = false;
        this.permission = false;

    }
}