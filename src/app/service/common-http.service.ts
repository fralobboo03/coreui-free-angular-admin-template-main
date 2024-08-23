import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  apiurl = environment.urlService;
  constructor(private http: HttpClient) { }

  getCraftperson(){
    return this.http.get<any>(this.apiurl + "/craftspeople/find-all");
  }
}
