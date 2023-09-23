import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  public addPermission(permission:any){
    return this.http.post(`${baseUrl}/permission/`,permission);
  }
  public updatePermission(permission:any){
    return this.http.put(`${baseUrl}/permission/`,permission);
  }
  public getallPermission(){
    return this.http.get(`${baseUrl}/permission/all`);
  }
  public deletePermission(id: string){
    return this.http.delete(`${baseUrl}/permission/delete/`+id);
  }

  
}
