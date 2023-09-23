import { Injectable } from '@angular/core';
import { baseUrl } from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItService {

  constructor(private http: HttpClient) { }

  // public uploadFile(file:any){
  //   return this.http.post(`${baseUrl}/it/upload/`,file);
  // }

}
