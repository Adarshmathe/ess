import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { Role, user } from 'src/app/modal/user';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  userbyId: user = new user();
  userId:Number = 0;
  allusers:user[]

  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, private loader: LoaderService, private _role: RoleService,private toast: NgToastService, private _user : UserService){
    this.userId=this.data.id;
    
  }

  public roles: Role[];

  ngOnInit(): void {
    this.getRoles();
    this.getAllUsers();
    this.getUserById();
   
  }


  user: FormGroup = this.fb.group({
    id: [''],
    name:['', [Validators.required]],
    erp:['', [Validators.required]],
    doj:['', [Validators.required]],
    // password:['', [Validators.required]],
    email:['', [Validators.required]],
    mobile:['', [Validators.required]],
    designation:['', [Validators.required]],
    department:['', [Validators.required]],
    manager_id: [''],
    role_id: [''],
    // image:[''],
    enabled:[''],
    // createdOn: ['']
  });

  getRoles():void{
    this._role.getallRole().subscribe(
      (data:GenericResponse)=>{
       this.roles = data.responseObject;
       console.log(this.roles);
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  getUserById(){
    this._user.getuserbyid(this.userId).subscribe(
      (data:GenericResponse)=>{
        this.userbyId = data.responseObject;
        this.initializeForm();        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  getAllUsers(){
    this._user.getalluser().subscribe(
      (data:GenericResponse)=>{
        this.allusers = data.responseObject;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }



  Submit():void{
     this.loader.start();
     this._user.updateUser(this.user.value).subscribe(
      (data:GenericResponse)=>{
        this.loader.stop();
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'User Updated',
          duration: 3000,
        });
     //  this.resetForm();
        
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

  initializeForm() {
    this.user.patchValue({
    id: this.userbyId.id,
    name:this.userbyId.name,
    erp:this.userbyId.erp,
    doj:this.userbyId.doj,
    // password:this.userbyId.password,
    email:this.userbyId.email,
    mobile:this.userbyId.mobile,
    designation:this.userbyId.designation,
    department:this.userbyId.department,
    manager_id:this.userbyId.manager_id,
    role_id:this.userbyId.role_id,
    // image:this.userbyId.image,
    enabled:this.userbyId.enabled,
    // createdOn: this.userbyId.createdOn
    });
  }

}
