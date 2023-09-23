import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  public addRole(role:any){
    return this.http.post(`${baseUrl}/role/`,role);
  }
  public updateRole(role:any){
    return this.http.put(`${baseUrl}/role/`,role);
  }
  public getallRole(){
    return this.http.get(`${baseUrl}/role/roles`);
  }
  public getRoleCount(){
    return this.http.get(`${baseUrl}/role/roles/count`);
  }
  public getRolebyid(id: Number){
    return this.http.get(`${baseUrl}/role/roles/${id}`);
  }
  public deleteRole(id: string){
    return this.http.delete(`${baseUrl}/role/delete/`+id);
  }

  

  


  
  

  
  






