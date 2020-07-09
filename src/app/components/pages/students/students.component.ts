import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { StudentService } from './../../../shared/services/student.service';
import { Student } from './../../../shared/models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public students: Array<Student>;
  public displayedColumns: string[] = ['name', 'age', 'photo', 'responsible', 'class'];
  public foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  public showForm = false;
  public add = false;
  public studentForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    responsible: new FormControl(''),
    age: new FormControl(''),
    class: new FormControl(''),
  });
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  //get all students from server
  getStudents(): void {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.students = students;
    })
  }

  //call method to save: either update or add
  save(): void {
    this.add ? this.addStudent() : this.updateStudent();
  }


  addStudent(): void {
    this.studentService.addStudent(this.studentForm.value).subscribe(() => {
      this.studentForm.reset();
      this.setFormView(false);
    }, (error) => { alert(error) });
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.studentForm.value).subscribe(
      () => {
        this.studentForm.reset();
        this.setFormView(false)
      },
      (error) => { console.log(error) })
  }

  deleteStudent(student: Student): void {
    this.studentService.removeStudent(student).subscribe(() => {
    }, (error) => { alert(error) });
  }

  editStudent(student: Student): void {
    this.setFormView(false);
    console.log(student)
    this.studentForm.patchValue({
      id: student.id,
      name: student.name,
      age: student.age,
      class: student.class,
      responsible: student.responsible
    });
  }

  //define if show the table or form - with parameter for add
  setFormView(add: boolean): void {
    this.showForm = !this.showForm;
    this.add = add;
  }


}
