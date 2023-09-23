import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { baseUrl } from './helper';
import { PermissionList } from '../modal/permission';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }
  
  //currentuser
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //set token in localstorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    // this.loginStatusSubject.next(true);
    return true;
  }
//user is login or not
public isLoggedin(){
  let tokenstr=localStorage.getItem('token');
  if(tokenstr==undefined || tokenstr=='' || tokenstr==null){
    return false;
  }else{
    return true;
  }
}
// logout:
public logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
}
//getToken
public getToken(){
  return localStorage.getItem('token');
}
//set userdetails
public setuser(user:any){
  localStorage.setItem('user',JSON.stringify(user));
}

public getUserPermission(){
  return JSON.parse(localStorage.getItem('user')).rolePermissionList as PermissionList[];
}

public getuser(){
  let userstr = localStorage.getItem('user');
  if(userstr!=null){
    return JSON.parse(userstr);
  }else{
    this.logout();
    return null;
  }
}
//get user role
public getUserRole(){
  let user = this.getuser();
  return user.authorities[0].authority;
}
}
