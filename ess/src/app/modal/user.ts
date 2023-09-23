import { RolePerm } from "./permission";

export class user{
    id:Number;
    name:string;
    erp:string;
    doj:Date;
    password:string;
    email:string;
    mobile:number;
    designation:string;
    department:string;
    manager_id:Number;
    manager_name:string;
    role_id:Number;
    role_name:string;
    rolePermissionList:RolePerm[];
    image:string;
    enabled:boolean;
    createdOn: Date;

    constructor(){
        this.id=0;
        this.name=null;
        this.erp=null;
        this.doj=null;
        this.password=null;
        this.email=null;
        this.mobile=null;
        this.designation=null;
        this.department=null;
        this.manager_id=0;
        this.manager_name=null;
        this.role_id=0;
        this.role_name=null;
        this.rolePermissionList=null;
        this.image=null;
        this.enabled=false;
        this.createdOn=null;
    }
}

export class Role{
    roleId:Number;
    roleName:string;
    status:Boolean
    CreatedOn:Date

    constructor(){
        this.roleId = 0;
        this.roleName ="";
        this.status = false;
        this.CreatedOn = null;
    }
}