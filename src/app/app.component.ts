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
  constructor(private studentService: StudentService,
              private classService: ClassService) { }

  ngOnInit(){
  }

  getStudents() {
    this.studentService.getStudents().subscribe((students:Student[])=>{
      console.log(students)
    })
  } 

  getClasses(){
    this.classService.getClasses().subscribe((c)=>{
      console.log(c)
    })
  }

}
