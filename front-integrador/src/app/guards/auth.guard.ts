import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
    const service = inject(AuthService);
    const router = inject(Router);

    if (service.isAuthenticated()) {
        if (isTokenExpired()) {
            service.logout();
            router.navigate(['/login']);
            return false;
        }

        // Verificar si el usuario tiene uno de los roles permitidos
        const allowedRoles = route.data?.['roles'] || [];
        const userRole = service.user.role; // Asegúrate de que el rol esté en el servicio

        if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
            router.navigate(['/forbidden']);
            return false;
        }

        // Redirigir a un componente según el rol
        switch (userRole) {
            case 'ROLE_ADMIN':
                router.navigate(['/admin']);
                break;
            case 'ROLE_USER':
                router.navigate(['/mis-citas']);
                break;
            case 'ROLE_DOCTOR':
                router.navigate(['/doctor']);
                break;
            // Agrega más roles según sea necesario
            default:
                router.navigate(['/home']);
        }

        return true; // El usuario está autenticado y tiene acceso
    }
    router.navigate(['/login']);
    return false;
}

const isTokenExpired = () => {
    const service = inject(AuthService);
    const token = service.token;
    const payload = service.getPayload(token);
    const exp = payload?.exp; // Asegúrate de que exp no sea undefined
    const now = new Date().getTime() / 1000;
    return (now > exp) ? true : false;
}
