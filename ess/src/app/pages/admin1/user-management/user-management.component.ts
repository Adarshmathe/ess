import { Component, OnInit } from '@angular/core';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { MenuPermissionClass } from 'src/app/modal/permission';
import { RoleService } from 'src/app/service/role.service';
import { UserPermissionService } from 'src/app/service/user-permission.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  public usercount:Number=0;
  public rolecount:Number=0;
  public menuPermissionClass = new MenuPermissionClass();

  constructor(private user_ : UserService, private role_:RoleService,private UserPermissionService: UserPermissionService){

  }
  ngOnInit(): void {
    this.getusersCount();
    this.getrolecount();
    this.getPermssions();
  }

  getusersCount(){
    this.user_.getUsersCount().subscribe(
      (data:GenericResponse)=>{
        this.usercount=data.responseObject
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  getrolecount(){
    this.role_.getRoleCount().subscribe(
      (data:GenericResponse)=>{
        this.rolecount = data.responseObject;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  getPermssions() {
    this.UserPermissionService.updateUserPermission();
    this.menuPermissionClass = this.UserPermissionService.getMenuPermission();    
  }

}
