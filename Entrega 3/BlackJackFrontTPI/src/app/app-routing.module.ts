import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MesaComponent } from './mesa/mesa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { Reporte1Component } from './reportes/reporte1/reporte1.component';

const routes: Routes = [
  { path: '', component: MesaComponent },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'reportes',
    component: Reporte1Component,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
