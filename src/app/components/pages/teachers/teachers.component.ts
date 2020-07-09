import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Teacher } from './../../../shared/models/teacher.model';
import { TeacherService } from './../../../shared/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  public teachers: Array<Teacher>;
  public showForm = false;
  public add = false;
  displayedColumns: string[] = ['name', 'classes'];
  teacherForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    classes: new FormControl(''),
  });
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  constructor(private teacherService:TeacherService) { }

  ngOnInit(): void {
    this.getTeacher();
  }

  //get all classes from server
  getTeacher(): void {
    this.teacherService.getTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers;
    })
  }

  //call method to save: either update or add
  save(): void {
    this.add ? this.addClass() : this.updateClass();
  }


  addClass(): void {
    let teacher = this.teacherForm.value;

    this.teacherService.addTeacher(teacher).subscribe(() => {
      this.teacherForm.reset();
      this.setFormView(false);
    }, (error) => { alert(error) });
  }

  updateClass(): void {
    let teacher = this.teacherForm.value;
    teacher.ageRange = [this.teacherForm.value.startAge, this.teacherForm.value.endAge];

    this.teacherService.updateTeacher(this.teacherForm.value).subscribe(
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
