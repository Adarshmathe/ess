import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage1Component } from './pages/admin1/home-page1/home-page1.component';
import { UserManagementComponent } from './pages/admin1/user-management/user-management.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewRoleComponent } from './pages/admin1/user-management/role/view-role/view-role.component';
import { ViewUserComponent } from './pages/admin1/user-management/user/view-user/view-user.component';
import { CreateRoleComponent } from './pages/admin1/user-management/role/create-role/create-role.component';
import { CreateUserComponent } from './pages/admin1/user-management/user/create-user/create-user.component';
import { ITUploadDocComponent } from './pages/admin1/it-upload-doc/it-upload-doc.component';
import { ITViewDocComponent } from './pages/admin1/it-view-doc/it-view-doc.component';
import { HRUploadDocComponent } from './pages/admin1/hr-upload-doc/hr-upload-doc.component';
import { HRViewDocComponent } from './pages/admin1/hr-view-doc/hr-view-doc.component';
import { DashboardComponent } from './pages/admin1/dashboard/dashboard.component';
import { ProfileComponent } from './pages/admin1/profile/profile.component';
import { ViewPermissionComponent } from './pages/admin1/user-management/permission/view-permission/view-permission.component';
import { CreatePermissionComponent } from './pages/admin1/user-management/permission/create-permission/create-permission.component';
import { CircularComponent } from './pages/admin1/circular/circular.component';
import { ItCircularComponent } from './pages/admin1/circular/it-circular/it-circular.component';
import { HrCircularComponent } from './pages/admin1/circular/hr-circular/hr-circular.component';
import { ProfileGuard } from './Guard/profile.guard';
import { UsermanagementGuard } from './Guard/usermanagement.guard';
import { CircularGuard } from './Guard/circular.guard';
import { OrgTreeComponent } from './pages/admin1/org-tree/org-tree.component';

const routes: Routes = [
  {path:"login", component:LoginComponent,pathMatch:"full"},

  {path:'home', component:HomePage1Component,children:[
    {path:'',component:DashboardComponent},
    {path:'org-Tree',component:OrgTreeComponent},
    {path:'profile',component:ProfileComponent,canActivate:[ProfileGuard]},
    {path:'usermanagement' ,children:[
      {path:'',component:UserManagementComponent ,canActivate:[UsermanagementGuard]},
      {path:'role',component:ViewRoleComponent},
      {path:'permission',component:ViewPermissionComponent},
      {path:'user',component:ViewUserComponent},
      {path:'create-role',component:CreateRoleComponent},
      {path:'create-permission',component:CreatePermissionComponent},
      {path:'create-user',component:CreateUserComponent}
    ]},
    {path:'circular', children:[
      {path:'',component:CircularComponent,canActivate:[CircularGuard]},
      {path:'IT' ,children:[
        {path:'',component:ItCircularComponent},
        {path:'upload',component:ITUploadDocComponent},
        {path:'view',component:ITViewDocComponent},
        
      ]},
      {path:'HR' ,children:[
        {path:'',component:HrCircularComponent},
        {path:'upload',component:HRUploadDocComponent},
        {path:'view',component:HRViewDocComponent},
        
      ]},
    ]},
    
  ]},
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
