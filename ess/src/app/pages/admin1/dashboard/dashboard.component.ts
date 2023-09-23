import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { MenuPermissionClass } from 'src/app/modal/permission';
import { RoleService } from 'src/app/service/role.service';
import { UserPermissionService } from 'src/app/service/user-permission.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public usercount:Number=0;
  public rolecount:Number=0;
  public menuPermissionClass = new MenuPermissionClass();

  constructor(private user_ : UserService, private role_:RoleService, private loader: LoaderService,private UserPermissionService: UserPermissionService){

  }
  ngOnInit(): void {
    this.getusersCount();
    this.getrolecount();
    this.getPermssions();
  }

  getusersCount(){
    this.loader.start();
    this.user_.getUsersCount().subscribe(
      (data:GenericResponse)=>{
        this.loader.stop();
        this.usercount=data.responseObject
        
      },
      (error)=>{
        this.loader.stop();
        console.log(error);
        
      }
    )
  }
  getrolecount(){
    this.loader.start();
    this.role_.getRoleCount().subscribe(
      (data:GenericResponse)=>{
        this.loader.stop();
        this.rolecount = data.responseObject;
      },
      (error)=>{
        this.loader.stop();
        console.log(error);
        
      }
    )
  }

  getPermssions() {
    this.UserPermissionService.updateUserPermission();
    this.menuPermissionClass = this.UserPermissionService.getMenuPermission();    
  }

 

  
}


