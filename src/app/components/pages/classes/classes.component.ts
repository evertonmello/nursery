import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ClassService } from './../../../shared/services/class.service';
import { TeacherService } from './../../../shared/services/teacher.service';
import { SClass } from './../../../shared/models/sclass.model';
import { Teacher } from '../../../shared/models/teacher.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  public classes: Array<SClass>;
  public teachers: Array<Teacher>;
  public displayedColumns: string[] = ['name', 'ageRage', 'startTime', 'endTime', 'teacher'];
  public showForm = false;
  public add = false;
  public loader = true;
  public classForm: FormGroup = new FormGroup({
    id:new FormControl(''),
    name: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    startAge: new FormControl(''),
    endAge: new FormControl(''),
    teacher: new FormControl(''),
  });

  constructor(
    private classService: ClassService,
    private teacherService:TeacherService
    ) { }

  ngOnInit(): void {
    this.getClasses();
    this.getTeachers();
  }

  //get all classes from server
  getClasses(): void {
    this.classService.getClasses().subscribe((classes: SClass[]) => {
      this.classes = classes;
      this.loader = false;
    })
  }

  getTeachers(){
    this.teacherService.getTeachers().subscribe((teachers:Teacher[])=>{
      this.teachers = teachers;
    })
  }

  //call method to save: either update or add
  save(): void {
    this.add ? this.addClass() : this.updateClass();
  }


  addClass(): void {
    let sClass = this.classForm.value;
    sClass.ageRange = [this.classForm.value.startAge,this.classForm.value.endAge ];

    this.classService.addClass(sClass).subscribe(() => {
      this.classForm.reset();
      this.setFormView(false);
    }, (error) => { alert(error) });
  }

  updateClass(): void {
    let sClass = this.classForm.value;
    sClass.ageRange = [this.classForm.value.startAge,this.classForm.value.endAge ];

    this.classService.updateClass(this.classForm.value).subscribe(
      () => {
        this.classForm.reset();
        this.setFormView(false)
      },
      (error) => { console.log(error) })
  }

  deleteClass(student: SClass): void {
    this.classService.removeClass(student).subscribe(() => {
    }, (error) => { alert(error) });
  }

  editClass(sClass: SClass): void {
    this.setFormView(false);
    this.classForm.patchValue({
      id: sClass.id,
      name: sClass.name,
      startAge:sClass.ageRange[0],
      endAge: sClass.ageRange[1],
      startTime: sClass.startTime,
      endTime: sClass.endTime,
      teacher: sClass.teacher
    });
  }

  //define if show the table or form - with parameter for add
  setFormView(add: boolean): void {
    this.showForm = !this.showForm;
    this.classForm.reset();
    this.add = add;
  }

}
