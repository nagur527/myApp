import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NotificationService, AuthenticationService, StorageService } from '../core/services/_index';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(private auth: AuthenticationService, private storageService: StorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: NotificationService, private userService: UserService) { }

  ngOnInit() {
    if (this.auth.isUserLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  setClassEmail() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        this.storageService.setItem('access_token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error => this.toast.showNotification('danger', 'invalid email or password!')
    );
  }

}
