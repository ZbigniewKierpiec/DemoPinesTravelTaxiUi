import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  // const cookieService = inject(CookieService);
  // const authService = inject(AuthService);
  // const user = authService.getUser();
  // const router = inject(Router);
  // let token = cookieService.get('Authorization');

  // if (token && user) {
  //   token = token.replace('Bearer ', '');
  //   const decodeToken: any = jwtDecode(token);

  //   const expiryDate = decodeToken.exp * 1000;
  //   const currentTime = new Date().getTime();
  //   if (expiryDate < currentTime) {
  //     authService.logout();
  //     return router.createUrlTree(['bracknellTaxis/login'], {
  //       queryParams: { returnUrl: state.url },
  //     });
  //   } else {
  //     if (user.roles.includes('Writer')) {
  //       return true;
  //     } else {
  //       alert('Unauthorized');
  //       router.createUrlTree(['/'], {
  //         queryParams: { returnUrl: state.url },
  //       });
  //       return false;
  //     }
  //   }
  // } else {
  //   authService.logout();
  //   return router.createUrlTree(['bracknellTaxis/login'], {
  //     queryParams: { returnUrl: state.url },
  //   });
  // }


  // const cookieService = inject(CookieService);
  // const authService = inject(AuthService);
  // const user = authService.getUser();
  // const router = inject(Router);
  // let token = cookieService.get('Authorization');

  // // Jeśli użytkownik jest zalogowany, pozwalamy na dostęp do strony
  // if (user || token) {
  //   return true;  // Użytkownik ma dostęp do chronionej strony
  // } else {
  //   // Jeśli użytkownik nie jest zalogowany, przekierowujemy na stronę logowania
  //   return router.createUrlTree(['bracknellTaxis/login'], {
  //     queryParams: { returnUrl: state.url }, // Zapisywanie URL, na który użytkownik chciał wejść, aby po zalogowaniu przekierować go z powrotem
  //   });
  // }


  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get user and token
  const user = authService.getUser();
  let token = cookieService.get('Authorization');

  // If token and user exist, validate the token and check expiry
  if (token && user) {
    // Remove "Bearer " from token if present
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    // Get the expiry date from the token and check if it is expired
    const expiryDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    // If token is expired, log the user out and redirect to login
    if (expiryDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['bracknellTaxis/login'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      // If the user has the role 'Writer', allow access
     

      if (user.roles && (user.roles.includes('Writer') || user.roles.includes('Reader'))) {
        return true;
      } else {
        alert('Unauthorized');
        return router.createUrlTree(['/'], {
          queryParams: { returnUrl: state.url },
        });
      }







    }
  } else {
    // If no token or user, log out and redirect to login
    authService.logout();
    return router.createUrlTree(['bracknellTaxis/login'], {
      queryParams: { returnUrl: state.url },
    });
  }



};
