/**
 * Created by myuser on 9/28/2016.
 */

import { Routes, RouterModule} from '@angular/router';

import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login.component";
import {ModuleWithProviders} from "@angular/core";
import {UserComponent} from "./components/user";

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: '',
        component: LoginComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
