
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
/* Services */
import * as CORE_SERVICES from './services/_index';

/* Directives */

/* Components */
import { PreLoaderComponent } from './components/_index';
import { LoaderInterceptorService } from '../interceptors/loader-interceptor.service';


@NgModule({
  declarations: [
    PreLoaderComponent,
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    TranslateModule,
    ToastrModule
  ],
  exports: [
    PreLoaderComponent,
  ],
  providers: [
    CORE_SERVICES.AjaxService,
    CORE_SERVICES.StorageService,
    CORE_SERVICES.AuthenticationService,
    CORE_SERVICES.NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        CORE_SERVICES.AjaxService,
        CORE_SERVICES.StorageService,
        CORE_SERVICES.AuthenticationService,
        CORE_SERVICES.NotificationService
      ]
    };
  }
}
