import { Routes } from '@angular/router';
import {MainLayoutComponent} from './core/layout/main-layout-component/main-layout-component';
import {TrackList} from './features/home/components/track-list/track-list';
import {authGuard} from './core/guards/auth.guard';
import {adminGuard} from './core/guards/admin.guard';

export const routes: Routes = [
    {
      path: "login",
      loadComponent : ()=>import("./features/auth/login/login-component/login-component")
          .then((c)=>c.LoginComponent)
    },
    {
      path:"register",
      loadComponent:    ()=> import("./features/auth/register/register-component/register-component")
          .then((c)=>c.RegisterComponent)
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: TrackList },
            {
                path: "add-track",
                canActivate: [adminGuard],
                loadComponent: () => import('./features/add-track/add-track/add-track')
                    .then((c) => c.AddTrackComponent)
            },
        ]
    },

    {
        path: 'home'
        , loadComponent: () => import('./features/home/home')
            .then((c) => c.Home)
    },

    {
        path:"**",
        redirectTo:""
    }
];
