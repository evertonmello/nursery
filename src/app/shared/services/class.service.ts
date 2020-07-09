import { Injectable } from '@angular/core';

import { Observable,from} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, } from 'rxjs/operators';

import { SClass } from './../models/sclass.model'

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
        let sClass = <SClass> resp.payload.doc.data();
        sClass.id = resp.payload.doc.id;
        return sClass;
      }))
    );
  }

  addClass(sClass: SClass):Observable<any>{
    return from(this.firestore.collection('classes').add(sClass));
  }

  removeClass(sClass: SClass):Observable<any>{
    return from(this.firestore.collection('classes').doc(sClass.id).delete());
  }

  updateClass(sClass: SClass):Observable<any>{
    return from(this.firestore.collection('classes').doc(sClass.id).update(sClass));
  }
}
