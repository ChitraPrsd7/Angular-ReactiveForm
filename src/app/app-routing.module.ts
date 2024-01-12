import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { BaseComponent } from './base/base.component';
import { EachDetailComponent } from './each-detail/each-detail.component';
import { EditComponent } from './edit/edit.component';
import { MainComponent } from './main/main.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { negateAuthGuard } from './guard/negate-auth.guard';
import { authGuard } from './guard/auth.guard';


const routes: Routes = [


  {
    path: 'login', component: LoginFormComponent, canActivate: [negateAuthGuard] },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: BaseComponent, canActivate: [authGuard] ,children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'details', component: TableDetailsComponent
      },
      {
        path: 'add', component: MainComponent
      },
      {
        path: 'view', component: EachDetailComponent
      },
      {
        path: 'edit', component: EditComponent
      },
    ]

  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
