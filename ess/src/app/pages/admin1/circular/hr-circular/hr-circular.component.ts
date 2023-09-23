import { Component, OnInit } from '@angular/core';
import { MenuPermissionClass } from 'src/app/modal/permission';
import { UserPermissionService } from 'src/app/service/user-permission.service';

@Component({
  selector: 'app-hr-circular',
  templateUrl: './hr-circular.component.html',
  styleUrls: ['./hr-circular.component.css']
})
export class HrCircularComponent implements OnInit{
  public menuPermissionClass = new MenuPermissionClass();

  constructor(private UserPermissionService: UserPermissionService){}

  ngOnInit() {
    this.getPermssions();
  }
  
  getPermssions() {
    this.UserPermissionService.updateUserPermission();
    this.menuPermissionClass = this.UserPermissionService.getMenuPermission();    
  }
}
