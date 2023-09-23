import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuPermissionClass } from 'src/app/modal/permission';
import { UserPermissionService } from 'src/app/service/user-permission.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit{
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  panelOpenState = false;

  items: string[] = [ "Item 1", "Item 2", "Item 3", "Item 4"];
  toggle = [];
  toggle1 = [];
  toggle2 = [];
  toggle3 = [];
  toggle31 = [];
  toggle32 = [];
  
  public menuPermissionClass = new MenuPermissionClass();

  constructor(private UserPermissionService: UserPermissionService){}

  ngOnInit() {
    this.getPermssions();
  }
  
  getPermssions() {
    this.UserPermissionService.updateUserPermission();
    this.menuPermissionClass = this.UserPermissionService.getMenuPermission();
    // console.log(this.menuPermissionClass);
    
  }
}
