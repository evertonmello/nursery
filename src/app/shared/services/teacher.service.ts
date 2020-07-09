import { Injectable } from '@angular/core';

import { Observable,from} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, } from 'rxjs/operators';

import { Teacher } from './../models/teacher.model'

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  teachers: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
  }

  getTeachers():Observable<any>{
    return this.firestore.collection('teachers').snapshotChanges().pipe(
      map(actions => actions.map(resp =>{
        let teacher = <Teacher> resp.payload.doc.data();
        teacher.id = resp.payload.doc.id;
        return teacher;
      }))
    );
  }

  addTeacher(teacher: Teacher):Observable<any>{
    return from(this.firestore.collection('teachers').add(teacher));
  }

  removeTeacher(teacher: Teacher):Observable<any>{
    return from(this.firestore.collection('teachers').doc(teacher.id).delete());
  }

  updateTeacher(teacher: Teacher):Observable<any>{
    return from(this.firestore.collection('teachers').doc(teacher.id).update(teacher));
  }
}
