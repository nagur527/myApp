import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AjaxService } from '../core/services/_index';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(private ajaxService: AjaxService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // start our loader here
    this.ajaxService.preLoader = true;
    this.ajaxService.isRequestOn = true;
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
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
