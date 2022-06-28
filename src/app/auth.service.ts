import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate  {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/auth']);
      alert("Please login first!")
      return false;
    }
    return true;
  }

  login(data: any) {
    const { username, password } = data

    if(username == "admin" && password == "admin") {
      this.setSession()

      this.router.navigate(['/']);
      alert("Logging In!")
    }
    else {
      alert("Invalid email or password!")
    }
  }

  setSession() {
    const expiresAt = moment().add(7200, 'second');
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('expiresAt');

    this.router.navigate(['/auth']);
  }

  public isLoggedIn(): boolean {
    if(moment().isBefore(this.getExpiration()) == false) this.logout()
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: any = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
