import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { PermissionService } from 'src/app/service/permission.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.css']
})
export class CreatePermissionComponent implements OnInit{
  constructor(private fb: FormBuilder, private _permission: PermissionService,private toast: NgToastService,  private loader: LoaderService,  private userService : UserService){}
  
  ngOnInit(): void {
     
  }

  permission: FormGroup = this.fb.group({
    id: [''],
    moduleName:['', [Validators.required]],
    controllerName:['', [Validators.required]],
    actionName:['', [Validators.required]],
  });


 

  Submit():void{
     this.loader.start();
     this._permission.addPermission(this.permission.value).subscribe(
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
    this.permission.patchValue({
     id: '',
     moduleName:'',
    controllerName:'',
    actionName:'',
    });
  }
}
