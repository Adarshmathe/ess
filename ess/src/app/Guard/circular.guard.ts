import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPermissionService } from '../service/user-permission.service';

@Injectable({
  providedIn: 'root'
})
export class CircularGuard implements CanActivate {
  constructor(private permissionService: UserPermissionService){}
  
  canActivate() { 
    if(!this.permissionService.isPermissionUpdated)
    {
      this.permissionService.updateUserPermission();
    }
    return this.permissionService.menuPermissionClass.isCircularPermission;
}
  
}
