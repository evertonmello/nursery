import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { ClassesComponent } from './components/classes/classes.component';
import { TeachersComponent } from './components/teachers/teachers.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'alunos', component: StudentsComponent },
  { path: 'professores', component: TeachersComponent },
  { path: 'turmas', component: ClassesComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
