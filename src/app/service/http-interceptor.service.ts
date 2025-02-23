import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem("accessToken")
    let headers = req.headers
    if (accessToken) {
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const reqNew = req.clone({headers})
    console.log("HttpInterceptor")
    console.log(`req.headers`,reqNew.headers)
    return next.handle(reqNew).pipe(tap({next: (res) => {
      console.log("res",res)
    },
    error: (err) => {
      console.log("err",err)
      if (err.error.status == "401" || err.error.status == "403") {
        this.router.navigate(["/login"])
      }
    }})
    );
  }
}
