import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { Node1, PermissionList, RolePerm, RolePermissionList } from 'src/app/modal/permission';
import { Role } from 'src/app/modal/user';
import { PermissionService } from 'src/app/service/permission.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit{
  userrole:Role;
  roleId:Number;
  // private editRole = new EditRole();

  tab1Active = true;
  tab2Active = false;
  tab1Class = "active";
  tab2Class = "";
  isDisable: boolean = true;
  public permissionList: RolePermissionList;

  public selectAll: Node1 = new Node1('SelectAll', false, null);

  constructor(private fb: FormBuilder,private _permission:PermissionService,@Inject(MAT_DIALOG_DATA) public data: any, private _role: RoleService,private toast: NgToastService,private loader: LoaderService){
    this.roleId=this.data.id;
    console.log(this.roleId);
    
  }

  ngOnInit(): void {
    // this.getRoleById();
    this.getPermistionList();

  }


  role: FormGroup = this.fb.group({
    roleId: [''],
    roleName:['', [Validators.required]],
    status:['', [Validators.required]],
    createdOn: '',
    rolePermissionList: this.fb.array([])
  });

  get rp() {
    return this.role.get('rolePermissionList') as FormArray;
  }

  next(tab: string) {
    if (tab == "home") {
        this.tab1Active = true;
        this.tab2Active = false;

        this.tab1Class = "active";
        this.tab2Class = "";
    }
    if (tab == "menu1") {
        this.tab1Active = false;
        this.tab2Active = true;

        this.tab1Class = "";
        this.tab2Class = "active";
    }
}

getPermistionList(){
  this.loader.start();
  this._permission.getallPermission().subscribe(
    (data:GenericResponse)=>{
      this.loader.stop();
      console.log(data);
      this.iterratePermission(data.responseObject)
      this.callSetRoles();    },
    (error)=>{
      this.loader.stop();
      console.log(error);
      
    }
  )
}

callSetRoles() {
  this._role.getRolebyid(this.roleId).subscribe(
    (data:GenericResponse)=>{
      this.setRoles(data.responseObject);
    },
    (error)=>{
      console.log(error);
      
    }
  )
}

setRoles(roleList: RolePerm[]) {
  if (roleList.length == 0)
      return;


  this.role.get('roleId').setValue(roleList[0].roleId);
  this.role.get('roleName').setValue(roleList[0].roleName);
  this.role.get('status').setValue(roleList[0].status);


  for (let role of roleList) {
      for (let rolePermission of this.selectAll.children) {
          for (let cntPer of rolePermission.children) {
              for (let actPer of cntPer.children) {
                  if (actPer.id == role.perId) {
                      actPer.status = true;
                      this.childCheckChange(actPer);
                  }
              }
          }
      }
  }
}

iterratePermission(localPermisionList: PermissionList[]) {
  for (let permission of localPermisionList) {
      let moduleFlag = true;

      for (let rolePermission of this.selectAll.children) {
          if (permission.moduleName == rolePermission.name) {
              let controllerFlag = true;
              for (let ctrPermission of rolePermission.children) {
                  if (permission.controllerName == ctrPermission.name) {
                      ctrPermission.children.push(this.addAction(permission, ctrPermission));
                      controllerFlag = false;
                      break;
                  }
              }
              if (controllerFlag) {
                  rolePermission.children.push(this.addController(permission, rolePermission));
              }
              moduleFlag = false;
              break;
          }
      }

      if (moduleFlag) {
        let setRole = new Node1(permission.moduleName, false, this.selectAll);
        setRole.children.push(this.addController(permission, setRole));
        this.selectAll.children.push(setRole)
      }

  }

}
parentCheckChange(item: Node1) {
  for (let i of item.children) {
      i.status = item.status;
      if (i.children.length > 0) {
          this.parentCheckChange(i);
      }
  }
}

childCheckChange(parent: Node1) {
  let allChecks = true;
  for (let i of parent.children) {
      if (!i.status) {
          allChecks = false;
          break;
      }
  }
  if (allChecks) {
      parent.status = true;
  }
  else {
      parent.status = false;
  }
  if (parent.parent) {
      this.childCheckChange(parent.parent);
  }
}

checkChange(item: Node1) {
  item.status = item.status;
  // We're handling the ALL checkbox
  if (item.name === this.selectAll.name) {
      this.parentCheckChange(item);
  }
  // We're handling the toggling of all of the children here
  else {
      if (item.children.length > 0) {
          this.parentCheckChange(item);
      }
      this.childCheckChange(item.parent);
  }
}

addAction(ac: PermissionList, parent: Node1): Node1 {
  let setAction = new Node1(ac.actionName, false, parent);
  setAction.id = ac.id;
  return setAction;
}

addController(rp: PermissionList, parent: Node1): Node1 {
  let setController = new Node1(rp.controllerName, false, parent);
  let setAction = new Node1(rp.actionName, false, setController);
  setAction.id = rp.id;
  setController.children.push(setAction);
  return setController;
}
  Submit():void{
    for (let rolePermission of this.selectAll.children) {
      for (let cntPer of rolePermission.children) {
          for (let actPer of cntPer.children) {
              if (actPer.status) {
                  this.permissionList = new RolePermissionList();
                  this.permissionList.permissionId = actPer.id;
                  console.log(this.permissionList);
                  
                  this.rp.push(this.fb.control(this.permissionList));
              }
          }
      }
  }
  if(this.rp.length==0){
    this.toast.error({
      detail: 'Error',
      summary: 'Please add permissions',
      duration: 3000,
    });
    return;
  }

  this.loader.start();
    this._role.updateRole(this.role.value).subscribe(
      (data:GenericResponse)=>{
        this.loader.stop();
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Role Updated',
          duration: 3000,
        });
        
      },
      (error)=>{
        this.loader.stop();
        this.toast.error({
          detail: 'Error',
          summary: error.message,
          duration: 3000,
        });
        console.log(error);
        
      }
    )

  }
}
