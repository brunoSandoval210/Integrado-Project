export const navbarData = [
    //*********Rutas para el doctor************
    {
        routerLink: '/doctor-profile',
        icon: 'fa fa-user-md',
        label: 'Doctor Profile',
        roles: ['ROLE_DOCTOR']
    },
    {
        routerLink: '/doctor/search-user',
        icon: 'fa fa-search',
        label: 'Buscar paciente',
        roles: ['ROLE_DOCTOR']
    },
    //*********Rutas para el cliente************
    {
        routerLink: '/patient-profile',
        icon: 'fa fa-calendar-check',
        label: 'Mis citas',
        roles: ['ROLE_USER']
    },
    {
        routerLink: '/patient/horarios',
        icon: 'fa fa-calendar-alt',
        label: 'Horarios disponibles',
        roles: ['ROLE_USER']
    },
    //*********Rutas para el admin************
    // {
    //     routerLink: '/admin-profile',
    //     icon: 'fa fa-tachometer-alt',
    //     label: 'Admin Profile',
    //     roles: ['ROLE_ADMIN']
    // },
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