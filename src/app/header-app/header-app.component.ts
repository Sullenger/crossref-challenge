import { Component, OnInit } from '@angular/core';

//Services
import { DatasharingService } from 'src/app/services/datasharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header-app.component.html'
})
export class HeaderAppComponent implements OnInit {

  searchVal: string = ''
  pattern = new RegExp(/[^a-zA-Z0-9 ,._-]/g);

  constructor(private dataSharing: DatasharingService) { }

  ngOnInit(): void {
  }

  applySearch(e:any, arg: string) {
    // Called on key up to remove forbidden characters
    // Submits to Data sharing service on enter
    let regexReplacement = arg.replace(this.pattern,'');
    this.searchVal = regexReplacement
    if (e.key === "Enter" || e.pointerType === "mouse") {
      this.dataSharing.setSearchParameter(regexReplacement)
    }
  }

  clearSearch(arg: string) {
    // Resets data sharing service when input is emptied
    if (arg === '') {
      this.dataSharing.setSearchParameter(arg)
    }
  }

}
