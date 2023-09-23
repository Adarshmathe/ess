import { Injectable, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { HrPermission, ItPermission, MenuPermissionClass, PermissionList, UserManagementPermission } from '../modal/permission';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService{

  public permissionFromStorage: PermissionList[];
  public actionArray: string[];
  public isPermissionUpdated: boolean = false;

  public menuPermissionClass = new MenuPermissionClass();
//   public ItPermission = new ItPermission();
//   public HrPermission = new HrPermission();
//   public UserManagementPermission = new UserManagementPermission();


  constructor(public _login:LoginService) {}


  updateUserPermission(){
    this.menuPermissionClass = new MenuPermissionClass();
    this.permissionFromStorage = this._login.getUserPermission();

    for(let permission of this.permissionFromStorage){
      switch (permission.moduleName) {
        case 'dashboard':
            this.checkAction(permission.controllerName, permission.actionName);
            break;
        case 'user_management':
            this.checkAction(permission.controllerName, permission.actionName);
            break;
        case 'circular':
            this.checkAction(permission.controllerName, permission.actionName);
            break;
        default:
            break;
    }
    }
    this.isPermissionUpdated = true;
  }

  checkAction(controllerName: string, actionList: string) {
  
    this.actionArray = actionList.split(',');

    switch (controllerName) {
        case 'dashboard_link':
            this.setDashBoardPermission(this.actionArray);
            break;
        case 'it_link':
            this.setItLinkPermission(this.actionArray);
            break;
        case 'hr_link':
            this.setHrLinkPermission(this.actionArray);
            break;
        case 'user_management_link':
            this.setUserManagementPermission(this.actionArray);
            break;
        default:
            break;
    }
}


setDashBoardPermission(actionArray: string[]) {

  for (let action of actionArray) {
      switch (action) {
          case 'user_management':
              this.menuPermissionClass.isUserManagementPermission = true;
              break;
          case 'profile':
              this.menuPermissionClass.isProfilePermission = true;
              break;
          case 'circular':
              this.menuPermissionClass.isCircularPermission = true;
              break;
          default:
              break;
      }
  }
}

setItLinkPermission(actionArray: string[]) {
  for (let action of actionArray) {
      switch (action) {
          case 'upload':
              this.menuPermissionClass.ItPermission.upload = true;
              break;
          case 'view':
              this.menuPermissionClass.ItPermission.view = true;
              break;
          default:
              break;
      }
  }
}

setHrLinkPermission(actionArray: string[]) {
  for (let action of actionArray) {
      switch (action) {
          case 'upload':
              this.menuPermissionClass.HrPermission.upload = true;
              break;
          case 'view':
              this.menuPermissionClass.HrPermission.view = true;
              break;
          default:
              break;
      }
  }
}

setUserManagementPermission(actionArray: string[]) {
  for (let action of actionArray) {
      switch (action) {
          case 'role':
              this.menuPermissionClass.UserManagementPermission.role = true;
              break;
          case 'user':
              this.menuPermissionClass.UserManagementPermission.user = true;
              break;
          case 'permission':
              this.menuPermissionClass.UserManagementPermission.permission = true;
              break;
          default:
              break;
      }
  }
}

getMenuPermission() { return this.menuPermissionClass }

}
