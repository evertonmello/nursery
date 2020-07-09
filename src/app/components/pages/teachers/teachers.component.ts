import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

const ELEMENT_DATA = [
  {name: 1, teacher: 'Hydrogen'},
  {name: 2, teacher: 'Helium'},
  {name: 3, teacher: 'Lithium'},
  {name: 4, teacher: 'Beryllium'},
  {name: 5, teacher: 'Boron'},
  {name: 6, teacher: 'Carbon'}
];
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  showForm = false;
  displayedColumns: string[] = ['name', 'teacher'];
  teacherForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    classes: new FormControl(''),
  });
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

  setFormView(){
    this.showForm = !this.showForm;
  }
}
