import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router, 
    private notification: NotificationService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.firebaseAuth
    .authState
      .pipe(
        map(user => {
          if(user) {
            return true;
          } else {
            this.notification.showMessage("Acesso negado! Realize o login")
            this.router.navigate(["/login"])
            return false;
          }
        })
      )

  }
  
}
