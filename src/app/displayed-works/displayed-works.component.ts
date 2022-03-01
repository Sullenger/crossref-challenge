import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatasharingService } from 'src/app/services/datasharing.service';
import { ApiService } from 'src/app/services/api.service';
import { isNullOrUndefined } from '../isnull';

@Component({
  selector: 'app-displayed-works',
  templateUrl: './displayed-works.component.html',
})
export class DisplayedWorksComponent implements OnInit {

  totalPages: number = 0
  currentPage: number = 0
  totalResults: number = 0
  dataLoaded: boolean = false
  dialogDataLoaded: boolean = false
  worksList: any
  selectedWork: any
  selectedWorkRes: any
  displayDialog: boolean = false;
  filterSearchSub: any
  filterSearchParam: any
  showPagination: boolean = false
  expandDialogDesc: boolean = false
  triggerSearch: boolean = true
  pattern = new RegExp(/[^a-zA-Z0-9 ,._-]/g);

  constructor(private dataSharing: DatasharingService, private api: ApiService) { }

  ngOnInit(): void {
    this.filterSearchSub = this.dataSharing.getSearchParameter().subscribe(searchRes => {
      if (!isNullOrUndefined(searchRes) && searchRes !== '') {
        this.filterSearchParam = searchRes
        this.querySearch()
      } else {
        this.filterSearchParam = ""
        this.fetchWorks()
      }
    })
  }

  ngOnDestroy() {
    // Removes subscription on page destroy
    if (this.filterSearchSub) {
      this.filterSearchSub.unsubscribe()
    }
  }

  fetchWorks() {
    // Base call for collecting all works
    this.triggerSearch = false //Needed to correct pagination issue
    this.dataLoaded = false
    this.currentPage = 0
    this.apiCall()
  }

  showDialog(arg: any) {
    // Triggers dialog when an article has been selected
    this.dialogDataLoaded = false
    this.selectedWork = arg
    let urlEncoded = encodeURIComponent(this.selectedWork.DOI)
    this.api.getWorkDetails(urlEncoded).subscribe(detailRes => {
      if (!isNullOrUndefined(detailRes)) {
        if (detailRes.message.abstract) {
          // Removes some xml tags found in the descriptions of some articles
          detailRes.message.abstract = detailRes.message.abstract.replace("<jats:title>", "")
          .replace("</jats:title>", "")
          .replace("<jats:p>", "")
          .replace("</jats:p>", "")
        }
        if (detailRes.message.type) {
          detailRes.message.type = detailRes.message.type.replace(/(\w)(\w*)/g,
            function(g0: string, g1: string, g2: string){return g1.toUpperCase() + g2.toLowerCase();});
        }
        if (detailRes.message.language) {
          detailRes.message.language = detailRes.message.language.toUpperCase()
        }
        this.selectedWorkRes = detailRes.message
        this.displayDialog = true;
        this.dialogDataLoaded = true
      }
    })
}

  paginate(arg: any) {
    // Triggered during paginate
    this.dataLoaded = false
    this.currentPage = arg.page
    this.apiCall()
  }

  querySearch() {
    // Called when Subscription from Data sharing service is updated
    this.triggerSearch = false //Needed to correct pagination issue
    this.dataLoaded = false
    this.currentPage = 0
    this.filterSearchParam = encodeURIComponent(this.filterSearchParam)
    this.apiCall()
  }

  apiCall() {
    // Configures url and global variables as appropriate for different api events
    this.scrollToTop()
    this.dataLoaded = false
    let url = ''
    if (!isNullOrUndefined(this.filterSearchParam) && this.filterSearchParam !== "") {
      url += "&query.bibliographic=" + this.filterSearchParam
    } 
    url += "&offset=" + (this.currentPage * 20)
    this.api.getWorks(url).subscribe(res => {
      if (!isNullOrUndefined(res)) {
        this.triggerSearch = true //Needed to correct pagination issue
        this.worksList = res.message.items
        this.totalPages = (res.message['total-results'] / 20)
        this.totalResults = res.message['total-results']
        this.dataLoaded = true
      }
    })
  }

  scrollToTop() {
    // Scrolls back to top when API call is triggered
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
