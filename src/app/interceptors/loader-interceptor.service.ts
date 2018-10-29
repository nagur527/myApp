import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AjaxService, StorageService } from '../core/services/_index';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  private _headers: HttpHeaders = new HttpHeaders();
  constructor(private ajaxService: AjaxService, private _storageService: StorageService) {
    this._headers.set('Content-Type', 'application/json');
  }
  private _getHeaders(custom_headers?: any): HttpHeaders {

    const access_token: string = this._storageService.getItem('access_token');
    if (access_token) {
      this._headers.append('Authorization', 'Bearer ' + access_token);
    }
    if (custom_headers) {
      for (const headerType in custom_headers) {
        if (headerType) {
          this._headers.append(headerType, custom_headers[headerType]);
        }
      }
    }
    return this._headers;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // start our loader here
    this.ajaxService.preLoader = true;
    this.ajaxService.isRequestOn = true;


    const headerSettings: { [name: string]: string | string[]; } = {};
    let changedRequest = request;
    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    const access_token: string = this._storageService.getItem('access_token');
    if (access_token) {
      headerSettings['Authorization'] = 'Bearer ' + access_token;
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader
    });

    return next.handle(changedRequest).pipe(tap((event: HttpEvent<any>) => {
      // if the event is for http response
      if (event instanceof HttpResponse) {
        // stop our loader here
        this.ajaxService.preLoader = false;
        this.ajaxService.isRequestOn = false;
      }

    }, (err: any) => {
      // if any error (not for just HttpResponse) we stop our loader bar
      this.ajaxService.preLoader = false;
      this.ajaxService.isRequestOn = false;
    }));
  }
}
