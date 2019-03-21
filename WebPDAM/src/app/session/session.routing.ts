import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SingupComponent } from './singup/singup.component';

export const SessionRoutes: Routes = [{
    path: '',
    component: SigninComponent,
}, {
    path: 'signup',
    component: SingupComponent
}];
