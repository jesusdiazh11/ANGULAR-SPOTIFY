import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkCookieSession();
  }

  checkCookieSession(): boolean {
    try {
      const token: boolean = this.cookieService.check('token');
      console.log('🆗🆗🆗', token);
      if (!token) {
        this.router.navigate(['/', 'auth']);
      }
      return token;
    } catch (e) {
      console.log('Ocurrió un problema, intenta nuevamente! 🔴', e);
      return false;
    }
  }
}
