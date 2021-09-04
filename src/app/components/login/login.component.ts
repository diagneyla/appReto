import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  selectedForm: number = 0;

  get email() {
    return this.loginForm.get('email').value;
  }
  get password() {
    return this.loginForm.get('password').value;
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    if (this.selectedForm === 0) {
      this.authService.SignIn(this.email, this.password);
      console.log(this.loginForm.value);
    } else {
      this.authService.SignUp(this.email, this.password);
      console.log(this.loginForm.value);
    }
  }

  loginWithGoogle() {
    this.authService.GoogleAuth();
  }

  setSelectedForm(evt: any) {
    if (evt.index !== this.selectedForm) {
      this.loginForm.markAsPristine();
      this.loginForm.markAsUntouched();
    }
    this.selectedForm = evt.index;
  }
}
