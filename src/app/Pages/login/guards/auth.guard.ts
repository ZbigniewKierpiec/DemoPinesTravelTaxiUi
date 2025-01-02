import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const user = authService.getUser();
  const router = inject(Router);
  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodeToken: any = jwtDecode(token);

    const expiryDate = decodeToken.exp * 1000;
    const currentTime = new Date().getTime();
    if (expiryDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['bracknellTaxis/login'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      if (user.roles.includes('Writer')) {
        return true;
      } else {
        alert('Unauthorized');
        router.createUrlTree(['/'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    }
  } else {
    authService.logout();
    return router.createUrlTree(['bracknellTaxis/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
