import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationService, StorageService } from '../core/services/_index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router, public toast: NotificationService, private _storageService: StorageService) { }

  private getUserDetails() {
    this.userService.getUserDetails('user2').subscribe(
      res => {
        console.log(res);
        // this.storageService.setItem('access_token', res.token);
        // this.router.navigate(['/dashboard']);
      },
      error => this.toast.showNotification('danger', 'invalid email or password!')
    );
  }
  logoutUser() {
    this._storageService.clear();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.getUserDetails();
  }

}
