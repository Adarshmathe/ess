import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { Node1, PermissionList, RolePermissionList } from 'src/app/modal/permission';
import { PermissionService } from 'src/app/service/permission.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit{

  constructor(private fb: FormBuilder, private _role: RoleService,private _permission:PermissionService ,private toast: NgToastService,  private loader: LoaderService,){}

  tab1Active = true;
  tab2Active = false;
  tab1Class = "active";
  tab2Class = "";
  isDisable: boolean = true;
  public permissionList: RolePermissionList;

  public selectAll: Node1 = new Node1('SelectAll', false, null);


  ngOnInit(): void {
   this.getPermistionList();
  }

  role: FormGroup = this.fb.group({
    roleId: [''],
    roleName:['', [Validators.required]],
    status:[true, [Validators.required]],
    createdOn: new Date(),
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
    },
    (error)=>{
      this.loader.stop();
      console.log(error);
      
    }
  )
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
    this._role.addRole(this.role.value).subscribe(
      (data:GenericResponse)=>{
        this.loader.stop();
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Role Created',
          duration: 3000,
        });
       this.resetForm();
        
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

  resetForm() {
    this.role.patchValue({
      roleId:'',
      roleName:'',
      status:false,
      createdOn: new Date()
    });
  }
}
