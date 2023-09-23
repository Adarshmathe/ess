import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { baseUrl } from 'src/app/service/helper';
import { UploadMultiFilesService } from 'src/app/service/upload-multi-files.service';

@Component({
  selector: 'app-it-upload-doc',
  templateUrl: './it-upload-doc.component.html',
  styleUrls: ['./it-upload-doc.component.css']
})
export class ITUploadDocComponent implements OnInit{

  // private reader: FileReader;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fileName:string[]=[];

  fileLink = baseUrl + "/IT/file/";
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
  
    this._upload.uploadITFile(file).subscribe(
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
    this._upload.getITFiles().subscribe(
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

  // ITUpload: FormGroup = this.fb.group({
  //   file: [''],
  //   filedata: [''],
  //   filename: [''],
  //   filetype: [''],
  // });

  // onselectFile(e) {
  //   if (
  //     e.target.files[0].type.indexOf('image') == -1 &&
  //     e.target.files[0].type.indexOf('pdf') == -1
  //   ) {
  //     alert('Only (jpg, png, pdf) are allowed.');
  //     return;
  //   } else if (e.target.files[0].type.indexOf('pdf') != -1) {
  //     this.ITUpload.patchValue({ filetype: 'pdf' });
  //   } else if (e.target.files[0].type.indexOf('image') != -1) {
  //     this.ITUpload.patchValue({ filetype: 'image' });
  //   }
  //   this.ITUpload.get('file').setErrors(null);
  //   this.reader = new FileReader();
  //   this.reader.readAsDataURL(e.target.files[0]);

  //   this.reader.onload = (event: any) => {
  //     this.ITUpload.patchValue({ filedata: event.target.result });
  //   };
  // }


  // Submit():void{
  //   this.loader.start();
  //   this._it.uploadFile(this.ITUpload.value).subscribe(
  //     (data:GenericResponse)=>{
  //       this.loader.stop();
  //       this.toast.success({
  //         detail: 'SUCCESS',
  //         summary: data.responseMessage,
  //         duration: 3000,
  //       });
  //     //  this.resetForm();
        
  //     },
  //     (error)=>{
  //       this.loader.stop();
  //       this.toast.error({
  //         detail: 'Error',
  //         summary: error.message,
  //         duration: 3000,
  //       });
  //       console.log(error);
        
  //     }
  //   )

  // }

}
