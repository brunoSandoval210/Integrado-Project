
export class User{
    id:number=0;
    name!:string;
    lastname!:string;
    dni!:string;
    email!:string;
    username!:string;
    password!:string;
}


export class UserFilters{
    roleId!: any;
    // status!: number;
  };
// {
//     "name": "Rosa",
//     "lastname": "Mendez",
//     "dni": "92837456",
//     "email": "rosa.mendez@example.com",
//     "password": "Password123",
//     "status": 1,
//     "role": 2
// }