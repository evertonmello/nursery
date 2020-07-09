import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';


const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
];

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['name', 'ageRage', 'startTime', 'endTime', 'teacher'];
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  showForm = false;
  studentForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    responsible: new FormControl(''),
    age: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
  }

  setFormView(){
    this.showForm = !this.showForm;
  }

}
