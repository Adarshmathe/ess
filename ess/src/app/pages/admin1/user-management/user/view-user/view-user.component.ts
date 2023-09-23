import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { user } from 'src/app/modal/user';
import { UserService } from 'src/app/service/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  userList: user[];
  closeResult: string;
  constructor(
    private loader: LoaderService,
    public dialog: MatDialog,
    private _user:UserService,
    private modalService: NgbModal,
    private toast: NgToastService,

  ) {
    this.dataSource = new MatTableDataSource();
  }

  dataSource: MatTableDataSource<any>;
  dataChanged$: Subscription | undefined;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {
    this.getUsers();
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'erp',
    'doj',
    'email',
    'mobile',
    'designation',
    'department',
    'manager',
    'role',
    'status',
    'CreatedOn',
    'projectGear',
  ];

  
  getUsers(): void {
    this.loader.start();
    this._user.getalluser().subscribe(
      (data: GenericResponse) => {
        this.loader.stop();
        this.userList = data.responseObject
        
        this.dataSource = new MatTableDataSource(data.responseObject);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }

  deleteuser(id) {
    this._user.deleteuser(id).subscribe(
      (data) => {
        this.ngOnInit();
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'User Deleted',
          duration: 3000,
        });
      },
      (error) => {
        console.log(error);
        this.toast.error({
          detail: 'Error',
          summary: error.message,
          duration: 3000,
        });
      }
    );
  }

  EditDialog(id) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      data: { id: id, title: 'Edit' },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this._user.getalluser().subscribe(
        (data: GenericResponse) => {
          this.dataSource = new MatTableDataSource(data.responseObject);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  confirmBox(id) {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res == 'Yes') {
        this.deleteuser(id);
      }
    });
  }

  newpassword = {
    password: '',
    id: '',
  };

  //PASSWORD RESET
  reset(content, id) {
    this.newpassword.id = id;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;

          if (this.newpassword.password) {
            this._user.newpassword(this.newpassword).subscribe(
              (res: user) => {
                this.toast.success({
                  detail: 'SUCCESS',
                  summary: 'Password Changed',
                  duration: 3000,
                });
                this.newpassword.id = '';
                this.newpassword.password = '';
                //  this.snack.open('password changed','',{duration:3000});
              },
              (error) => {
                console.log(error);
                this.toast.error({
                  detail: 'Error',
                  summary: error.message,
                  duration: 3000,
                });

                this.newpassword.id = '';
                this.newpassword.password = '';
                // this.snack.open('password not changed','',{duration:3000});
              }
            );
          }
        },
        (reason) => {
          this.newpassword.id = '';
          this.newpassword.password = '';
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

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

  Status: { status: boolean; id: Number } = {
    status: null,
    id: null,
  };

  changeStatus(id) {
    var s = this.userList.filter((e) => e.id == id).map((e) => e.enabled);

    this.Status.status = s[0] ? false : true;
    this.Status.id = id;

    this._user.changeStatus(this.Status).subscribe(
      (data: GenericResponse) => {
          // this.snack.open('User Unblocked','',{duration:3000});
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Status changed',
            duration: 3000,
          });
          // this.snack.open('User Blocked','',{duration:3000});
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'User Blocked',
            duration: 3000,
          });
        this.getUsers();
      },
      (error) => {
        console.log(error);
        this.toast.error({
          detail: 'Error',
          summary: error.message,
          duration: 3000,
        });
      }
    );
  }
}
