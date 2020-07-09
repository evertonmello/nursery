import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { StudentService } from './../../../shared/services/student.service';
import { ClassService } from './../../../shared/services/class.service';
import { Student } from './../../../shared/models/student.model';
import { SClass } from '../../../shared/models/sclass.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public students: Array<Student>;
  public classes: Array<SClass>;
  public displayedColumns: string[] = ['name', 'age', 'photo', 'responsible', 'class'];
  public showForm = false;
  public loader = true;
  public add = false;
  public studentForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    responsible: new FormControl(''),
    age: new FormControl(''),
    class: new FormControl(''),
  });
  constructor(
    private studentService: StudentService,
    private classService: ClassService
    ) { }

  ngOnInit(): void {
    this.getStudents();
    this.getClasses();
  }

  //get all students from server
  getStudents(): void {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.students = students;
      this.loader = false;
    })
  }

  getClasses(){
    this.classService.getClasses().subscribe((classes: SClass[])=>{
      this.classes = classes;
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
    this.studentForm.reset();
    this.add = add;
  }


}
