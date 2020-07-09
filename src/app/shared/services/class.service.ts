import { Injectable } from '@angular/core';

import { Observable,from} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, } from 'rxjs/operators';

import { Class } from './../models/class.model'

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classes: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
  }

  getClasses():Observable<any>{
    return this.firestore.collection('classes').snapshotChanges().pipe(
      map(actions => actions.map(resp =>{
        let sClass = <Class> resp.payload.doc.data();
        sClass.id = resp.payload.doc.id;
        return sClass;
      }))
    );
  }

  addClass(sClass: Class):Observable<any>{
    return from(this.firestore.collection('classes').add(sClass));
  }

  removeClass(sClass: Class):Observable<any>{
    return from(this.firestore.collection('classes').doc(sClass.id).delete());
  }

  updateClass(sClass: Class):Observable<any>{
    return from(this.firestore.collection('classes').doc(sClass.id).update(sClass));
  }
}
