import { Injectable } from '@angular/core';

import { Observable,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

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
    return this.afs.signInWithEmailAndPassword(email, password).then((user) => {
        console.log(user)
    })
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afs.signInWithPopup(provider);
    return credential.user;
  }



  logOut() {
    this.afs.signOut();
  }
  
}
