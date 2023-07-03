import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthguardService } from '../services/AuthGuardService/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private AuthGuardService: AuthguardService, private router: Router) { }
  canActivate(): boolean {
    if (!this.AuthGuardService.gettoken()) {
      this.router.navigateByUrl("/dashboard");
      console.log("login Success")
    }
    return this.AuthGuardService.gettoken();
  }
  
}
