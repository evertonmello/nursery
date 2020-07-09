import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './components/auth/auth.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { StudentsComponent } from './components/pages/students/students.component';
import { ClassesComponent } from './components/pages/classes/classes.component';
import { TeachersComponent } from './components/pages/teachers/teachers.component';
import { HomeLayoutComponent } from './components/layouts/home-layout.component';
import { LoginLayoutComponent } from './components/layouts/login-layout.component';


const routes: Routes = [
  {
    path: '',                       
    component: HomeLayoutComponent,
    // canActivate: [AuthGuard],       
    children: [
      { path: 'home',  component: HomeComponent },
      { path: 'alunos', component: StudentsComponent },
      { path: 'turmas', component: ClassesComponent },
      { path: 'professores', component: TeachersComponent }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent, 
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
