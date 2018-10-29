import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxService } from '../core/services/_index';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private ajaxService: AjaxService) { }
  login(credentials): Observable<any> {
    return this.ajaxService.request({ method: 'POST', url: 'token/generate-token', payload: credentials });
  }
  getUserDetails(name: string): Observable<any> {
    return this.ajaxService.request({ method: 'POST', url: 'user/userDetails' });
  }
}
