import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.token;

  //Se valida si existe un token, si es así se obtiene el payload del token y se valida si el token ha expirado, si no ha expirado se añade el token a la cabecera de la petición
  //En caso de que el token haya expirado se muestra un mensaje de error y se redirige al usuario a la página de login
  if (token) {
    const payload = authService.getPayload(token);
    if (payload) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp > currentTime) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(authReq);
      } else {
        console.error('Token expired');
        authService.logout();
        router.navigate(['/login']);
      }
    }
  }
  return next(req);
};