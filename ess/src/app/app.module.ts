import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePage1Component } from './pages/admin1/home-page1/home-page1.component';
import { CreateUserComponent } from './pages/admin1/user-management/user/create-user/create-user.component';
import { UserManagementComponent } from './pages/admin1/user-management/user-management.component';
import { AdminSidebarComponent } from './pages/admin1/admin-sidebar/admin-sidebar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateRoleComponent } from './pages/admin1/user-management/role/create-role/create-role.component';
import { ViewRoleComponent } from './pages/admin1/user-management/role/view-role/view-role.component';
import { ViewUserComponent } from './pages/admin1/user-management/user/view-user/view-user.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EditRoleComponent } from './pages/admin1/user-management/role/edit-role/edit-role.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditUserComponent } from './pages/admin1/user-management/user/edit-user/edit-user.component';
import { authInterceptorProviders } from './service/auth.interceptor';
import { ITUploadDocComponent } from './pages/admin1/it-upload-doc/it-upload-doc.component';
import { ITViewDocComponent } from './pages/admin1/it-view-doc/it-view-doc.component';
import { HRUploadDocComponent } from './pages/admin1/hr-upload-doc/hr-upload-doc.component';
import { HRViewDocComponent } from './pages/admin1/hr-view-doc/hr-view-doc.component';
import { ProfileComponent } from './pages/admin1/profile/profile.component';
import { DashboardComponent } from './pages/admin1/dashboard/dashboard.component';
import { PreviewModalComponent } from './components/preview-modal/preview-modal.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CreatePermissionComponent } from './pages/admin1/user-management/permission/create-permission/create-permission.component';
import { EditPermissionComponent } from './pages/admin1/user-management/permission/edit-permission/edit-permission.component';
import { ViewPermissionComponent } from './pages/admin1/user-management/permission/view-permission/view-permission.component';
import { CircularComponent } from './pages/admin1/circular/circular.component';
import { ItCircularComponent } from './pages/admin1/circular/it-circular/it-circular.component';
import { HrCircularComponent } from './pages/admin1/circular/hr-circular/hr-circular.component';
// import { OrgChartModule } from '@mondal/org-chart';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { OrgTreeComponent } from './pages/admin1/org-tree/org-tree.component';
import { PPipe } from './p.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePage1Component,
    CreateUserComponent,
    ViewUserComponent,
    NavbarComponent,
    UserManagementComponent,
    AdminSidebarComponent,
    ViewRoleComponent,
    CreateRoleComponent,
    LoaderComponent,
    EditRoleComponent,
    ConfirmationDialogComponent,
    EditUserComponent,
    ITUploadDocComponent,
    ITViewDocComponent,
    HRUploadDocComponent,
    HRViewDocComponent,
    ProfileComponent,
    DashboardComponent,
    PreviewModalComponent,
    CreatePermissionComponent,
    EditPermissionComponent,
    ViewPermissionComponent,
    CircularComponent,
    ItCircularComponent,
    HrCircularComponent,
    OrgTreeComponent,
    PPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgToastModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxExtendedPdfViewerModule,
    // OrgChartModule,
    NgxOrgChartModule
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
