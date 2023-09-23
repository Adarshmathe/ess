import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { PermissionService } from 'src/app/service/permission.service';
import { EditPermissionComponent } from '../edit-permission/edit-permission.component';
import { PermissionList } from 'src/app/modal/permission';

@Component({
  selector: 'app-view-permission',
  templateUrl: './view-permission.component.html',
  styleUrls: ['./view-permission.component.css']
})
export class ViewPermissionComponent implements OnInit{

  constructor( private _permission: PermissionService, private loader: LoaderService,public dialog: MatDialog,){
    this.dataSource = new MatTableDataSource();
  }

  dataSource: MatTableDataSource<PermissionList>;
  dataChanged$: Subscription | undefined;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {
    this.getPermission();
  }

  displayedColumns: string[] = [
    'id',
    'moduleName',
    'controllerName',
    'actionName',
  ];
   

  getPermission():void{
    this.loader.start();
    this._permission.getallPermission().subscribe(
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
 
    this._permission.deletePermission(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  EditDialog(id) {
    const dialogRef = this.dialog.open(EditPermissionComponent, {
      width: '800px',
      data: { id: id, title: 'Edit' },
    });
    dialogRef.afterClosed().subscribe((res) => {
    
      this._permission.getallPermission().subscribe(
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
