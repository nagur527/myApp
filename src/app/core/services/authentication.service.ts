import { Injectable, Inject } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';

/* Services */
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService implements CanActivate {
    constructor(
        private _storageService: StorageService,
        private _router: Router
    ) {

    }
    canActivate() {
        return this.isUserLoggedIn();
    }
    canDeactivate() {
        return !this.isUserLoggedIn();
    }
    isUserLoggedIn() {
        const token = this._storageService.getItem('access_token');
        return token ? true : false;
    }
    logoutUser(isSessionExpired?: boolean) {
        this._storageService.clear();
        this._router.navigate(['/login']);
    }
}
