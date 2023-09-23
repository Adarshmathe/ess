import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { baseUrl } from 'src/app/service/helper';
import { UploadMultiFilesService } from 'src/app/service/upload-multi-files.service';

@Component({
  selector: 'app-hr-view-doc',
  templateUrl: './hr-view-doc.component.html',
  styleUrls: ['./hr-view-doc.component.css']
})
export class HRViewDocComponent implements OnInit{

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
