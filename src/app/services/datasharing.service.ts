import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {
  
  private searchParameter = new BehaviorSubject<string>('');

  // Sets and returns behavior subject for use in queries
  setSearchParameter(arg: any) {
    this.searchParameter.next(arg);
  }
  getSearchParameter() {
    return this.searchParameter.asObservable();
  }
}
