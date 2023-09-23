import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class UploadMultiFilesService {

  constructor(private http: HttpClient) { }

  uploadITFile(file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('file', file);
    // formData.append('userId', id)

    const req = new HttpRequest('POST', `${baseUrl}/IT/uploadMultiFiles/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getITFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/IT/files`);
  }

  uploadHRFile(file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('file', file);
    // formData.append('userId', id)

    const req = new HttpRequest('POST', `${baseUrl}/HR/uploadMultiFiles/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getHRFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/HR/files`);
  }

  uploadProfileImage(id:any ,file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('image', file);
    formData.append('userId', id)

    const req = new HttpRequest('POST', `${baseUrl}/user/upload/image`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
