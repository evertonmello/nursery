import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: Observable<firebase.User>;

  constructor(private afs:AngularFireAuth) {
    this.user = afs.authState;
  }

  signUp(email: string, password: string): Promise<any> {
    return this.afs.createUserWithEmailAndPassword(email, password);  
  }

  login(email:string, password: string): Promise<any> {
    return this.afs.signInWithEmailAndPassword(email, password).then((user) => {})
  }


  logOut() {
    this.afs.signOut();
  }
  
}
