import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { LoginService } from '../../app/shared/services/login.service';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#signUp should return email',
    (done: DoneFn) => {
      let email = Math.random().toString(36).substring(7) +"@teste.com";
      from(service.signUp(email, "teste123")).subscribe(value => {
        expect(value.user.email).toEqual(email);
        done();
      });
    });

 it('#login should return undefined',
  (done: DoneFn) => {
    from(service.login("teste@teste.com", "teste123")).subscribe(value => {
      expect(value).toBeUndefined();
      done();
    });
  });
});

