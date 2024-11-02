export const navbarData = [
    //*********Rutas para el doctor************
    {
        routerLink: '/doctor-profile',
        icon: 'fa fa-user-md',
        label: 'Doctor Profile',
        roles: ['ROLE_DOCTOR']
    },
    //*********Rutas para el cliente************
    {
        routerLink: '/patient-profile',
        icon: 'fa fa-user',
        label: 'Patient Profile',
        roles: ['ROLE_USER']
    },
    //*********Rutas para el admin************
    {
        routerLink: '/admin-profile',
        icon: 'fa fa-tachometer-alt',
        label: 'Admin Profile',
        roles: ['ROLE_ADMIN']
    },
    {
        routerLink: '/admin/usuarios',
        icon: 'fa fa-users',
        label: 'Usuarios',
        roles: ['ROLE_ADMIN']
    },
    {
        routerLink: '/admin/horarios',
        icon: 'fa fa-calendar-alt',
        label: 'Horarios',
        roles: ['ROLE_ADMIN']
    },

]