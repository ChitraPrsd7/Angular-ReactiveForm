import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgePipe } from './pipe/age.pipe';
import { NumberPipe } from './pipe/number.pipe';
import { BaseComponent } from './base/base.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TableDetailsComponent } from './table-details/table-details.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ShareService } from './service/share.service';
import { EachDetailComponent } from './each-detail/each-detail.component';
import { EditComponent } from './edit/edit.component';
import { MainComponent } from './main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrNotificationService } from './service/toastr-notification.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login-form/login-form.component';
import { httpInterceptInterceptor } from './interceptor/http-intercept.interceptor';








@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AgePipe,
    NumberPipe,
    BaseComponent,
    EditComponent,
    TableDetailsComponent,
    DashboardComponent,
    EachDetailComponent,
    LoginFormComponent,
   
   
    
   

       
      

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
    FormsModule,
    FontAwesomeModule,
    
  ],
  providers: [ AgePipe, DatePipe, HttpClientModule,ShareService,  ToastrNotificationService, 
    provideHttpClient(
      withInterceptors ([httpInterceptInterceptor])
    )
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
