import { Component } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  loginData={
    userName:'',
    password:''
  };
  
  constructor(private snack:  MatSnackBar,private toast: NgToastService, private login:LoginService, private router:Router,  private userservice:UserService,  private loader: LoaderService) { }

  ngOnInit(): void {
  }

  formsubmit(){
    // console.log('login clk');
    if(this.loginData.userName.trim()=='' || this.loginData.userName==null){
      this.snack.open('Username is required','',{duration:3000});
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open('password is required','',{duration:3000});
      return;
    }
    //request to generate token
    // console.log(this.loginData);
    this.loader.start();
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.loader.stop();
            this.login.setuser(user);
            // console.log(user);
              this.login.loginStatusSubject.next(true);
              this.router.navigate(['home']);

          }
        );        
      },
      (error)=>{
        this.loader.stop();
        console.log(error);
        // this.snack.open(error.error.responseMessage,'',{duration:3000,horizontalPosition: this.horizontalPosition,
        //   verticalPosition: this.verticalPosition,})
          this.toast.error({
            detail: 'Error',
            summary: error.error,
            duration: 3000,
          });
        
      }
    )
  }


}