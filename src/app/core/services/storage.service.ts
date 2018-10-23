import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    private _storageExtension = 'localStorage';
    private _storage: any;
    constructor() {
        this._storage = window[this._storageExtension];
    }

    setItem(key, val) {
        this._storage.setItem(key, val);
    }

    getItem(key) {
        return this._storage.getItem(key);
    }

    clear() {
        this._storage.removeItem('access_token');
        this._storage.removeItem('expires_in');
    }

}
