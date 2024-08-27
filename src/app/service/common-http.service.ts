import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { CraftspersonModel, MaterialModel, Order, OrderRequest } from '../model/common.model';
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

  getMaterial(){
    return this.http.get<any>(this.apiurl + "/materials/find-all");
  }

  createMaterial(material: MaterialModel): Observable<MaterialModel> {
    return this.http.post<MaterialModel>(`${this.apiurl}/materials/save-mt`, material);
  }

  updateMaterial(id: number, material: MaterialModel): Observable<MaterialModel> {
    return this.http.put<MaterialModel>(`${this.apiurl}/materials/update-mt/${id}`, material);
  }

  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/materials/del-mt-by-id/${id}`);
  }

  findProducts(){
    return this.http.get<any>(this.apiurl + "/products/find-all");
  }

  productImagesUpdateFileById(id: number, formData: FormData){
    return this.http.put<any>(this.apiurl + `/product-images/upload-file-by-id/${id}`,formData);
  }

  getProducts(text:string){
    return this.http.post<any>(this.apiurl + "/products/get-products", {
      text: text
    });
  }

  getProductById(id: number){
    return this.http.get<any>(this.apiurl + `/products/${id}`);
  }

  saveProduct(req: any){
    return this.http.post<any>(this.apiurl + "/products/save",req);
  }

  deleteProductById(id: number){
    return this.http.delete<any>(this.apiurl + `/products/delete-by-id/${id}`);
  }

  getCustomers(){
    return this.http.get<any>(this.apiurl + `/customers/get-customers`);
  }

  saveOrder(order: OrderRequest): Observable<Order> {
    return this.http.post<Order>(this.apiurl + "/orders/save", order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiurl + "/orders/get-orders");
  }
}
