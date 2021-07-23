import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // we just create objects with path and component......
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path : 'hero/:id',
    component: HeroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
