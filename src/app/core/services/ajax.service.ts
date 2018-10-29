import { Injectable, Inject } from '@angular/core';

/* Services */
import { StorageService } from './storage.service';
import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const appUrl = 'http://35.171.150.178:8080/';

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
    // this._headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    // this._headers.set('Access-Control-Allow-Origin', '*');
    // this._headers.set('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");

  }

  public request(options: any): Observable<any> {
    if (options.url.indexOf('http') === -1 && options.url.indexOf('https') === -1) {
      options.url = appUrl + options.url;
    }
    this._requestInterceptor();
    return Observable.create(observer => {
      return this._http.request((options.method ? options.method : 'GET'), options.url, {
        body: (options.payload),
        headers: options.headers
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
