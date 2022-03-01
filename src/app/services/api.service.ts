import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators'

import { EnvironmentService } from 'src/app/services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  etiquetteCatch: string = "&mailto=jason.sullenger@gmail.com"

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
  }

  // API call for all works. Including offset and bibliographic
  getWorks(url?: string): Observable<any> {
    const worksGetUrl: string = this.environmentService.getApiUrl() + `/works?rows=20${url}` + this.etiquetteCatch;
    return this.http.get(worksGetUrl);
  }

  // API call to collect more information on a specific work
  getWorkDetails(workDoi: string): Observable<any> {
    const workDetails: string = this.environmentService.getApiUrl() + `/works/${workDoi}`;
    return this.http.get(workDetails);
  }
}
