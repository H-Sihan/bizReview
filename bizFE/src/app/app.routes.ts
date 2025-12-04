import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Businesses } from './businesses/businesses';
import { Business } from './businesses/business/business';
import { Login } from './login/login';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path:'businesses',
        component: Businesses
    },
    {
        path:'businesses/:id',
        component: Business
    },
    {
        path:'login',
        component: Login
    }
];
