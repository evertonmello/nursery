import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <mat-toolbar color="primary">
        <div>
            <a mat-button [routerLink]="'/turmas'"> Turmas </a>
            <a mat-button [routerLink]="'/alunos'"> Alunos </a>
            <a mat-button [routerLink]="'/professores'"> Professores </a>
        </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeLayoutComponent {}