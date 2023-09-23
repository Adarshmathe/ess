import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { Role } from 'src/app/modal/user';
import { RoleService } from 'src/app/service/role.service';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit{

  constructor( private _role: RoleService, private loader: LoaderService,public dialog: MatDialog,){
    this.dataSource = new MatTableDataSource();
  }

  dataSource: MatTableDataSource<Role>;
  dataChanged$: Subscription | undefined;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {
    this.getRoles();
  }

  displayedColumns: string[] = [
    'id',
    'roleName',
    'status',
    'CreatedOn',
    'projectGear'
  
  ];
   

  getRoles():void{
    this.loader.start();
    this._role.getallRole().subscribe(
      (data:GenericResponse)=>{
        this.loader.stop();
        this.dataSource = new MatTableDataSource(data.responseObject);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error)=>{
        this.loader.stop();
        console.log(error);
        
      }
    )
  }
  deleteuser(id) {
 
    this._role.deleteRole(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  EditDialog(id) {
    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: '800px',
      data: { id: id, title: 'Edit' },
    });
    dialogRef.afterClosed().subscribe((res) => {
    
      this._role.getallRole().subscribe(
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


}


