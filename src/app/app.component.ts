import { Component, OnInit } from '@angular/core';

import { StudentService } from './shared/services/student.service';
import { ClassService } from './shared/services/class.service';
import { Student } from './shared/models/student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'nursery';
  constructor() { }

  ngOnInit(){
  }

}
