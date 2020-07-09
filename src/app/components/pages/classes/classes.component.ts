import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ClassService } from './../../../shared/services/class.service';
import { Class } from './../../../shared/models/class.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  public classes: Array<Class>;
  public displayedColumns: string[] = ['name', 'ageRage', 'startTime', 'endTime', 'teacher'];
  public foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  public showForm = false;
  public add = false;
  public classForm: FormGroup = new FormGroup({
    id:new FormControl(''),
    name: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    startAge: new FormControl(''),
    endAge: new FormControl(''),
    teacher: new FormControl(''),
  });
  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.getClassses();
  }

  //get all classes from server
  getClassses(): void {
    this.classService.getClasses().subscribe((classes: Class[]) => {
      this.classes = classes;
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

  deleteClass(student: Class): void {
    this.classService.removeClass(student).subscribe(() => {
    }, (error) => { alert(error) });
  }

  editClass(sClass: Class): void {
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
