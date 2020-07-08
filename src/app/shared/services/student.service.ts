import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Student } from './../models/student.model';
 
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.students = firestore.collection('students').valueChanges();
  }

  getStudents(){
    return this.students;
  }

  addStudent(student: Student){
    return this.firestore.collection('students').add(student);
  }

  
}
