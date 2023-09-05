import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  registerName = '';
  registerEmail = '';
  registerUsername = '';
  registerPassword = '';
  referralCode = '';
  formState = 'visible';
  registerPhone = '';
  referredBy = '';
  referrer = '';

  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private bottomShetRef: MatBottomSheetRef
  ) {}

  onLogin(registerUsername: string, registerPassword: string) {
    this.apiService.login(registerUsername, registerPassword).subscribe(
      (response: any) => {
        this.showSnackBar('მოგესალმებით საიტზე', 'success');
        this.bottomShetRef.dismiss();
        console.log(response);
      },
      (error) => {
        this.showSnackBar(
          'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ კიდევ ერთხელ!',
          'error'
        );
        console.error('Login error:', error);
        console.log(error);
      }
    );
  }

  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass:
        type === 'success' ? ['success-snackbar'] : ['error-snackbar'],
    });
  }
  onRegister() {
    const newUser = {
      name: this.registerName,
      email: this.registerEmail,
      username: this.registerUsername,
      password: this.registerPassword,
      balance: '',
      manID: '',
      phone: this.registerPhone,
      referralCode: this.referralCode,
      referredBy: this.referredBy,
      referrer: this.referrer,
    };

    this.apiService.register(newUser).subscribe(
      (response: any) => {
        this.showSnackBar('Registration successful. Please log in.', 'success');
        this.bottomShetRef.dismiss();
        console.log(newUser);
      },
      (error: any) => {
        this.showSnackBar(
          'Error during registration. Please try again later.',
          'error'
        );
        console.error('Registration error:', error);
      }
    );
  }

  onForgotPassword() {}

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }

  onRegisterClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgotPasswordState() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return 'შესვლა';
      case AuthenticatorCompState.REGISTER:
        return 'რეგისტრაცია';
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return 'პაროლის აღდგენა';
    }
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}
