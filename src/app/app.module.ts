import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module'

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassesComponent } from './components/pages/classes/classes.component';
import { TeachersComponent } from './components/pages/teachers/teachers.component';
import { StudentsComponent } from './components/pages/students/students.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeLayoutComponent } from './components/layouts/home-layout.component';
import { LoginLayoutComponent } from './components/layouts/login-layout.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthService } from './components/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    TeachersComponent,
    ClassesComponent,
    ClassesComponent,
    TeachersComponent,
    StudentsComponent,
    LoginComponent,
    LoginLayoutComponent,
    HomeLayoutComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
