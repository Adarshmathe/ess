import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }


  public addUser(user:any){
    return this.http.post(`${baseUrl}/user/`,user);
  }
  public updateUser(user:any){
    return this.http.put(`${baseUrl}/user/`,user);
  }
  public getalluser(){
    return this.http.get(`${baseUrl}/user/users`);
  }
  public getUsersCount(){
    return this.http.get(`${baseUrl}/user/users/count`);
  }
  public getuserbyid(id: Number){
    return this.http.get(`${baseUrl}/user/users/${id}`);
  }
  public deleteuser(id: string){
    return this.http.delete(`${baseUrl}/user/delete/`+id);
  }
  public newpassword(newpassword:any){
    return this.http.post(`${baseUrl}/user/newpassword`,newpassword);
  }
  public changeStatus(Status:any){
  
  var form = new FormData();
  form.append('status',Status.status)
  form.append('id',Status.id)
  
    return this.http.post(`${baseUrl}/user/changestatus`,form);
  }
  convertDateStringUrl(dataValue: Date): string {    
    let value = moment(dataValue);
    let valueString = value.format('YYYY-MM-DD');
    return valueString;
  }
  
  public getusersByDate(dates:any):Observable<any>{
  
    var start = this.convertDateStringUrl(dates.start);
    var end = this.convertDateStringUrl(dates.end);
    let param: any = {'start': start,'end':end};
    
      return this.http.get(`${baseUrl}/user/getByDate`, {params: param})
    }

    public getuserlistTree(){
      return this.http.get(`${baseUrl}/user/usersTree`);
    }
}
