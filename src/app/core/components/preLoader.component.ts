import { Component } from '@angular/core';
import { AjaxService } from '../services/_index';

@Component({
    selector: 'app-preloader-comp',
    template: `
    <div *ngIf="_ajaxService.preLoader">
        <div class="preloader-backdrop">
        </div>
        <div class="preloader-container" >
           <!-- <span class="preloader">
                <img src="assets/images/API_Square_Enabled.png" />
            </span> -->
            <div class="card-block text-xs-center">
                <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .preloader-backdrop{
            top:0;
            position : fixed;
            opacity : 0.5;
            background : #EDEDED;
            width: 100%;
            height : 100%;
            z-index : 1051;
        }
        .preloader-container{
            position : fixed;
            width: 100%;
            height : 100%;
            z-index : 1052;
        }
        .preloader{
            position : absolute;
            top:40%;
            width:100%;
            text-align:center;
            -webkit-animation:spin 2s linear infinite;
            -moz-animation:spin 2s linear infinite;
            animation:spin 2s linear infinite;
        }
        @-moz-keyframes spin { 100% { -moz-transform: rotateY(360deg); } }
        @-webkit-keyframes spin { 100% { -webkit-transform: rotateY(360deg); } }
        @keyframes spin { 100% { -webkit-transform: rotateY(360deg); transform:rotateY(360deg); } }

    `]
})
export class PreLoaderComponent {
    private showPreLoader = false;
    constructor(
        public _ajaxService: AjaxService
    ) {
    }
}
