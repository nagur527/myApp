import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {
    constructor(private translateService: TranslateService,
        private toastrService: ToastrService) {

    }
    public showNotification(msgType: string, msg: string, isKey: boolean = true): void {
        let notify: Function;

        switch (msgType) {
            case 'info':
                notify = this.toastrService.info;
                break;
            case 'success':
                notify = this.toastrService.success;
                break;
            case 'warning':
                notify = this.toastrService.warning;
                break;
            case 'error':
                notify = this.toastrService.error;
                break;
            default:
                notify = this.toastrService.info;
                break;
        }
        const toastrService = this.toastrService;
        if (isKey) {
            const notify$ = this.translateService.get(msg).subscribe((res: string) => {
                notify.call(toastrService, res);
            });
            notify$.unsubscribe();
        } else {
            notify.call(toastrService, msg);
        }
    }
}
