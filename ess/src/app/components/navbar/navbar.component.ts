import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from './navbar.service';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/service/login.service';
import { user } from 'src/app/modal/user';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/service/helper';
import { GenericResponse } from 'src/app/modal/GenericResponse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  closeResult: string;
  isLoggedIn = false;
  user: user = null;
  url: string = '';
  userdata: user;
  istoggle: boolean = true;
  fileLink = baseUrl + "/user/view/"

  constructor(
    public login: LoginService,
    private router: Router,
    private userservice: UserService,
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private toast: NgToastService,
    private navService: NavbarService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedin();
    this.user = this.login.getuser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedin();
      this.user = this.login.getuser();
      this.getuser(this.user.id);
    });
    this.getuser(this.user.id);
  }
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isExpanded: boolean = false;
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  public logout() {
    this.login.logout();
    // window.location.reload();
    this.router.navigate(['/login']);
  }

  newpassword = {
    password: '',
    id: '',
  };

  reset(content) {
    let user = this.login.getuser();
    this.newpassword.id = user.id;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;

          if (this.newpassword.password) {
            this.userservice.newpassword(this.newpassword).subscribe(
              (res: user) => {
                // this.toast.success({
                //   detail: 'SUCCESS',
                //   summary: 'Password Changed',
                //   duration: 3000,
                // });
                this.newpassword.id = '';
                this.newpassword.password = '';
                this.snack.open('password changed', '', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              },
              (error) => {
                // console.log(error);
                // this.toast.error({
                //   detail: 'Error',
                //   summary: error.message,
                //   duration: 3000,
                // });

                this.newpassword.id = '';
                this.newpassword.password = '';
                this.snack.open('password not changed', error.message, {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.newpassword.id = '';
          this.newpassword.password = '';
        }
      );
    // this.modal.open();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.newpassword.id = '';
      this.newpassword.password = '';
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.newpassword.id = '';
      this.newpassword.password = '';
      return 'by clicking on a backdrop';
    } else {
      this.newpassword.id = '';
      this.newpassword.password = '';
      return `with: ${reason}`;
    }
  }

  // newpassword={
  //   password:'',
  //   id:''
  // }

  // async reset(){
  //   let user = this.login.getuser();
  //   let id = user.id;

  //   const { value: password } = await Swal.fire({
  //     title: 'Enter New password',
  //     input: 'password',
  //     inputLabel: 'Password',
  //     inputPlaceholder: 'Enter New password',
  //   })

  //   if (password) {
  //     this.newpassword.id=id;
  //     this.newpassword.password=password;
  //     this.userservice.newpassword(this.newpassword).subscribe(
  //       (res:user)=>{
  //         //  console.log(res);
  //          this.snack.open('password changed','',{duration:3000});
  //       },
  //       (error)=>{
  //         console.log("error");
  //         this.snack.open('password not changed','',{duration:3000});
  //         console.log(error);

  //       }
  //     )
  //   }
  //  }

  // viewprofiledialog1() {
  //   const id = this.user.id;

  //   const dialogRef = this.dialog.open(ViewprofileComponent, {
  //     width: '500px',
  //     data: { id: id, title: 'Edit' },
  //   });
  //   dialogRef.afterClosed().subscribe((res) => {
  //     this.ngOnInit();
  //   });
  // }

  getuser(id) {
    this.userservice.getuserbyid(id).subscribe(
      (data: GenericResponse) => {
        // console.log(data);
        this.userdata = data.responseObject;
        this.url = this.fileLink + this.userdata.image;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // toggle() {
  //   this.istoggle = !this.istoggle;

  //   this.navService.navbar_subject.next(this.istoggle);
  // }
}
