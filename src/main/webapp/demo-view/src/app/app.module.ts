import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { HomeService } from './home/home.service';
import { CategoriesService } from './categories/categories.service';
import { PasswordService } from './password/password.service';
import { ProfileService } from './profile/profile.service';
import { UsersService } from './users/users.service';
import { SearchService } from './search/search.service';

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CategoriesComponent } from './categories/categories.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';
/*
@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}*/

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoriesComponent,
    PasswordComponent,
    ProfileComponent,
    UsersComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService,/*{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }*/
  HomeService,CategoriesService,PasswordService,ProfileService,UsersService,SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
