import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
    const service = inject(AuthService);
    const router = inject(Router);

    if (service.isAuthenticated()) {
        if (isTokenExpired()) {
            service.logout();
            return false;
        }
        const userRoles = {
            isAdmin: service.isAdmin(),
            isDoctor: service.isDoctor(),
            isPatient:service.isPatient()
        };
        const allowedRoles = route.data?.['roles'] || []; // Roles permitidos definidos en la ruta
        // Verifica si el usuario tiene alguno de los roles permitidos para la ruta actual
        if (allowedRoles.length > 0 
            && !(userRoles.isAdmin && allowedRoles.includes('admin')) 
            && !(userRoles.isDoctor && allowedRoles.includes('doctor')) 
            && !(userRoles.isPatient && allowedRoles.includes('cliente'))) {
            router.navigate(['/forbidden']);
            return false;
        }
        return true;
    }
    router.navigate(['/login']);
    return false;
}

//funcion para verificar si el token ha expirado
const isTokenExpired=()=>{
    const service=inject(AuthService);
    const token=service.token;
    const payload=service.getPayload(token);
    const exp=payload.exp;
    const now=new Date().getTime()/1000;
    return (now>exp)?true:false;
}