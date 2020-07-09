import { Injectable } from '@angular/core';

import { Observable,from} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, } from 'rxjs/operators';

import { Student } from './../models/student.model';
 
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
  }

  getStudents():Observable<any>{
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(actions => actions.map(resp =>{
        let student = <Student> resp.payload.doc.data();
        student.id = resp.payload.doc.id;
        return student;
      }))
    );
  }

  addStudent(student: Student):Observable<any>{
    return from(this.firestore.collection('students').add(student));
  }

  removeStudent(student: Student):Observable<any>{
    return from(this.firestore.collection('students').doc(student.id).delete());
  }

  updateStudent(student: Student):Observable<any>{
    return from(this.firestore.collection('students').doc(student.id).update(student));
  }

  
}
