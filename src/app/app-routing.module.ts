import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { AuthGuard } from './guards/auth.guard';
import { AdministracionComponent } from './pages/administracion/administracion.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  }, {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'administracion',
        component: AdministracionComponent
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {
}
