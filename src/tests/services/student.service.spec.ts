import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { StudentService } from '../../app/shared/services/student.service';
import { environment } from '../../environments/environment';
import { Student } from './../../app/shared/models/student.model'

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ]
    });
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getstudents should return value from observable',
    (done: DoneFn) => {
      service.getStudents().subscribe(value => {
        expect(value[0]).toBeTruthy();
        done();
      });
    });

  it('#addStudent should return value from observable',
    (done: DoneFn) => {
      let student = <Student>{
        id:'test',  
        name:'test',
        age: 1,
        class: 'test',
        photo: 'test',
        responsible: 'test'
      }
      service.addStudent(student).subscribe(value => {
        expect(value.qa).toBeTruthy()
        expect(value.Ua).toBeTruthy()
        done();
      });
    });

  it('#removeStudent should return undefined',
    (done: DoneFn) => {
      let student = <Student>{
        id:'test',  
        name:'test',
        age: 1,
        class: 'test',
        photo: 'test',
        responsible: 'test'
      }
      service.removeStudent(student).subscribe(value => {
        expect(value).toBeUndefined();
        done();
      });
    });


});
