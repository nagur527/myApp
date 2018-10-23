import { Injectable, Inject } from '@angular/core';

/* Services */
import { StorageService } from './storage.service';
import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const appUrl = 'http://54.187.255.230:8080/';

@Injectable()
export class AjaxService {
  public isRequestOn: boolean;
  private _headers: HttpHeaders = new HttpHeaders();
  public preLoader = false;
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService,
    private _authService: AuthenticationService,
    private _notificationService: NotificationService
  ) {
    this._headers.set('Content-Type', 'application/json');
  }

  private _getHeaders(custom_headers?: any): HttpHeaders {

    const access_token: string = this._storageService.getItem('access_token');
    if (access_token) {
      this._headers.set('Authorization', 'Bearer ' + access_token);
    }
    if (custom_headers) {
      for (const headerType in custom_headers) {
        if (headerType) {
          this._headers.set(headerType, custom_headers[headerType]);
        }
      }
    }
    return this._headers;
  }

  public request(options: any): Observable<any> {
    if (options.url.indexOf('http') === -1 && options.url.indexOf('https') === -1) {
      options.url = appUrl + options.url;
    }
    this._requestInterceptor();
    return Observable.create(observer => {
      return this._http.request((options.method ? options.method : 'GET'), options.url, {
        body: (options.payload),
        headers: (options.headers ? this._getHeaders(options.headers) : this._getHeaders())
      }).subscribe(data => {
        observer.next(data);
        observer.complete();
      }, (error) => {
        this._requestErrorHandler(error);
      });
    });

  }

  private _requestErrorHandler(err) {
    console.log('error===>>', err);
    if (err.status === 401) {
      this._notificationService.showNotification('error', 'APPLICATION.MESSAGES.401_ERROR');
      this._authService.logoutUser(true);
    } else if (err.status === 0 || err.status >= 500) {
      this._notificationService.showNotification('error', 'APPLICATION.MESSAGES.500_ERROR');
    } else {
      // this._notificationService.showNotification('error',error.message,false);
    }
  }
  private _finallyBlockHandler() {
    this.preLoader = false;
    this.isRequestOn = false;
  }

  private _requestInterceptor() {
    this.preLoader = true;
    this.isRequestOn = true;
  }

}
