import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { Role, user } from 'src/app/modal/user';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  constructor(private fb: FormBuilder, private _role: RoleService,private toast: NgToastService,  private loader: LoaderService,  private userService : UserService){}

  public roles: Role[];
  public allusers:user[];
  
  ngOnInit(): void {
    this.getRoles();
    this.getAllUsers();
   
  }

  user: FormGroup = this.fb.group({
    id: [''],
    name:['', [Validators.required]],
    erp:['', [Validators.required]],
    doj:['', [Validators.required]],
    password:['', [Validators.required]],
    email:['', [Validators.required]],
    mobile:['', [Validators.required]],
    designation:['', [Validators.required]],
    department:['', [Validators.required]],
    manager_id: [null],
    role_id: [null],
    image:['default.png'],
    enabled:[true],
    createdOn: new Date()
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
  getAllUsers(){
    this.userService.getalluser().subscribe(
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
     this.userService.addUser(this.user.value).subscribe(
      (data:GenericResponse)=>{
        this.loader.stop();
        if(data.responseCode=='1'){
          this.toast.success({
            detail: 'SUCCESS',
            summary: data.responseMessage,
            duration: 3000,
          });
          this.resetForm();
        }else if(data.responseCode=='0'){
          this.toast.error({
            detail: 'Error',
            summary: data.responseMessage,
            duration: 3000,
          });
        }else{
          this.toast.error({
            detail: 'Unknown Error',
            summary: 'Something went wrong',
            duration: 3000,
        })
      }
      
        
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
    this.user.patchValue({
     id: '',
    name:'',
    erp:'',
    doj:'',
    password:'',
    email:'',
    mobile:'',
    designation:'',
    department:'',
    manager_id: null,
    role_id: null,
    image:'default.png',
    enabled:true,
    createdOn: new Date()
    });
  }
}
