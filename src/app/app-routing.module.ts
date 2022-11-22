import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'auth', //TODO: http://localhost:4200/auth <---
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule), //TODO: Cargar el modulo "HomeModule"
  },
  {
    path: '', //TODO: (private) 🔴🔴🔴
    component: HomePageComponent,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule), //TODO: Cargar el modulo "HomeModule"
      canActivate: [SessionGuard]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
