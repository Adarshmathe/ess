import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { user } from 'src/app/modal/user';
import { baseUrl } from 'src/app/service/helper';
import { LoginService } from 'src/app/service/login.service';
import { UploadMultiFilesService } from 'src/app/service/upload-multi-files.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  fileName:string[]=[];
  url:string = "";
  public userdata:user = new user() ;
  message: string[] = [];
  imageInfos?: Observable<any>;
  user : user ;

  tab1Active = true;
  tab2Active = false;
  tab1Class = "active";
  tab2Class = "";

  fileLink = baseUrl + "/user/view/";
  constructor(private _upload:UploadMultiFilesService,private login:LoginService,private _login:LoginService , private loader: LoaderService,private userService : UserService){ 
    }

  ngOnInit(): void {
    this.user = this._login.getuser();
    this.getuser(this.user.id);
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  upload(idx: number, file: File): void {

    const id = this.userdata.id;
     this.progressInfos[idx] = { value: 0, fileName: file.name };
   
     if (file) {
       this._upload.uploadProfileImage(id,file).subscribe(
         (event: any) => {
           if (event.type === HttpEventType.UploadProgress) {
             this.progressInfos[idx].value = Math.round(
               (100 * event.loaded) / event.total
             );
           } else if (event instanceof HttpResponse) {
             const msg = 'Uploaded the file successfully: ' + file.name;
             this.message.push(msg);
             // this.imageInfos = this.uploadService.getFiles();
           }else{
            this.login.loginStatusSubject.next(true);

           }
         },
         (err: any) => {
           this.progressInfos[idx].value = 0;
           const msg = 'Could not upload the file: ' + file.name;
           this.message.push(msg);
         }
       );
     }
   }
 
   uploadFiles(): void {
     this.message = [];
 
     if (this.selectedFiles) {
       for (let i = 0; i < this.selectedFiles.length; i++) {
         this.upload(i, this.selectedFiles[i]);
       }
     }
   }
 
   getuser(id){
    this.loader.start();
     this.userService.getuserbyid(id).subscribe(
       (data:GenericResponse)=>{
        this.loader.stop();
         this.userdata = data.responseObject;    
        //  console.log(this.userdata);
              
         this.url = this.fileLink + this.userdata.image;
       },
         (error)=>{
          this.loader.stop();
           console.log(error);
         }
         )
   }
 
   onselectFile(e){
   
     if(e.target.files){
       this.selectedFiles = e.target.files;
       var reader = new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       reader.onload= (event:any)=>{
         this.url = event.target.result;
         this.uploadFiles();
       }
     }
 
   }

   next(tab: string) {

    if (tab == "tab1") {
        this.tab1Active = true;
        this.tab2Active = false;
        this.tab1Class = "active";
        this.tab2Class = "";
    }
    if (tab == "tab2") {
        this.tab1Active = false;
        this.tab2Active = true;

        this.tab1Class = "";
        this.tab2Class = "active";
    }
}

}
