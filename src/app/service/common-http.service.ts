import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { CraftspersonModel } from '../model/common.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  apiurl = environment.urlService;
  constructor(private http: HttpClient) { }

  getCraftperson(){
    return this.http.get<any>(this.apiurl + "/craftspeople/find-all");
  }

  createCraftsperson(craftsperson: CraftspersonModel): Observable<CraftspersonModel> {
    return this.http.post<CraftspersonModel>(`${this.apiurl}/craftspeople/save`, craftsperson);
  }

  updateCraftsperson(id: number, craftsperson: CraftspersonModel): Observable<CraftspersonModel> {
    return this.http.put<CraftspersonModel>(`${this.apiurl}/craftspeople/update/${id}`, craftsperson);
  }

  deleteCraftsperson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/craftspeople/del-by-id/${id}`);
  }
}
