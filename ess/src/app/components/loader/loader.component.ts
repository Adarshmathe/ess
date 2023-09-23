import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  public active :boolean = false;
   constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
     this.loaderService.status.subscribe((status: boolean) => {
      this.active = status;
    });
  }

}
