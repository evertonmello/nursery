import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

import { Class } from './../models/class.model'

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classes: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.classes = firestore.collection('classes').valueChanges();
  }

  getClasses(){
    return this.classes;
  }
}
