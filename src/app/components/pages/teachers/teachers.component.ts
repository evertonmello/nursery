import { Component, OnInit,OnChanges,SimpleChanges  } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Teacher } from './../../../shared/models/teacher.model';
import { TeacherService } from './../../../shared/services/teacher.service';
import { ClassService } from './../../../shared/services/class.service';
import { Class } from '../../../shared/models/class.model';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit  {

  public teachers: Array<Teacher>;
  public classes = [];
  public showForm = false;
  public add = false;
  displayedColumns: string[] = ['name', 'classes'];
  teacherForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    classes_ids: new FormControl(''),
  });
XZ
  constructor(
    private teacherService:TeacherService,
    private classService:ClassService
    ) { }

  ngOnInit(): void {
    this.getTeacher();
    this.getClasses();
  }

  //get all classes from server
  getTeacher(): void {
    this.teacherService.getTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers;
    })
  }


  getClasses(){
    this.classService.getClasses().subscribe((classes: Class[])=>{
      classes.forEach(sClass => {
        this.classes.push({
          value: sClass.id,
          viewValue: sClass.name
        })
      });
    })
  }

  //call method to save: either update or add
  save(): void {
    this.add ? this.addClass() : this.updateClass();
  }


  addClass(): void {
    let teacher = this.teacherForm.value;
    teacher.classes = new Array(this.teacherForm.value.classes_ids);

    this.teacherService.addTeacher(teacher).subscribe(() => {
      this.teacherForm.reset();
      this.setFormView(false);
    }, (error) => { alert(error) });
  }

  updateClass(): void {
    let teacher = this.teacherForm.value;
    this.teacherService.updateTeacher(teacher).subscribe(
      () => {
        this.teacherForm.reset();
        this.setFormView(false)
      },
      (error) => { console.log(error) })
  }

  deleteClass(student: Teacher): void {
    this.teacherService.removeTeacher(student).subscribe(() => {
    }, (error) => { alert(error) });
  }

  editClass(teacher: Teacher): void {
    this.setFormView(false);
    this.teacherForm.patchValue({
      id: teacher.id,
      name: teacher.name,
      classes: teacher.classes
    });
  }

  //define if show the table or form - with parameter for add
  setFormView(add: boolean): void {
    this.showForm = !this.showForm;
    this.teacherForm.reset();
    this.add = add;
  }

}
