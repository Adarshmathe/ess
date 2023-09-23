import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { baseUrl } from 'src/app/service/helper';
import { UploadMultiFilesService } from 'src/app/service/upload-multi-files.service';

@Component({
  selector: 'app-hr-upload-doc',
  templateUrl: './hr-upload-doc.component.html',
  styleUrls: ['./hr-upload-doc.component.css']
})
export class HRUploadDocComponent {
 // private reader: FileReader;
 selectedFiles: FileList;
 progressInfos = [];
 message = '';
 fileName:string[]=[];

 fileLink = baseUrl + "/HR/file/";
 constructor(private _upload:UploadMultiFilesService,  private loader: LoaderService){ 
   }

 ngOnInit(): void {
   this.getAllFiles();
 }

 selectFiles(event) {
   this.progressInfos = [];
   this.selectedFiles = event.target.files;
 }

 uploadFiles() {
   this.message = '';
 
   for (let i = 0; i < this.selectedFiles.length; i++) {
     this.upload(i, this.selectedFiles[i]);
   }
 }

 upload(idx, file) {
   this.progressInfos[idx] = { value: 0, fileName: file.name };
 
   this._upload.uploadHRFile(file).subscribe(
     event => {
       if (event.type === HttpEventType.UploadProgress) {
         this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
       } else if (event instanceof HttpResponse) {
         this.getAllFiles();
       }
     },
     err => {
       this.progressInfos[idx].value = 0;
       this.message = 'Could not upload the file:' + file.name;
     });
 }

 getAllFiles(){
   this.loader.start();
   this._upload.getHRFiles().subscribe(
     (data:GenericResponse)=>{
       this.loader.stop();
       this.fileName = data.responseObject
       
     },
     (error)=>{
       this.loader.stop();
       console.log(error);
       
     }
   )
 }

 
}
