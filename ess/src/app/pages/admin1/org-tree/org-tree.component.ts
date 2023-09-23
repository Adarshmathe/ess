import { Component } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { GenericResponse } from 'src/app/modal/GenericResponse';
import { baseUrl } from 'src/app/service/helper';
import { UserPermissionService } from 'src/app/service/user-permission.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-org-tree',
  templateUrl: './org-tree.component.html',
  styleUrls: ['./org-tree.component.css']
})
export class OrgTreeComponent {
  public output:any = [];
  fileLink = baseUrl + "/user/view/";

  constructor(private user_ : UserService, private loader: LoaderService,private UserPermissionService: UserPermissionService){

  }
  ngOnInit(): void {
    this.getusersTree();
  }

  getusersTree(){
    this.loader.start();
    this.user_.getuserlistTree().subscribe(
      (data:GenericResponse)=>{
        this.loader.stop();
        // console.log(data.responseObject);
        this.formatJson(data.responseObject);
        
        // this.usercount=data.responseObject
        
      },
      (error)=>{
        this.loader.stop();
        console.log(error);
        
      }
    )
  }

  formatJson(json:any){
   let inputJson = json.sort((a, b) => (parseInt(a.level) > parseInt(b.level)) ? 1 : -1)
inputJson.forEach(v => {
    if (v.level == "0") {
    v.childs = [];
    // v.image = this.fileLink +v.image;
    this.output.push(v);
  }
  else {
    let pathValues = v.path.split("/");
    // v.image = this.fileLink +v.image;

    pathValues.pop();
    var node = null;
    var fullPath = "";
    pathValues.forEach(p => {
        fullPath = fullPath === "" ? p : fullPath + "/" + p;
        node = (node == null ? this.output : node.childs).find(o => o.path === fullPath);
    })
    node.childs = node.childs || [];
    node.childs.push(v);
  }
})
console.log(this.output);

  }
}
