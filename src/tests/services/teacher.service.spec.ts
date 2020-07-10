import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { TeacherService } from '../../app/shared/services/teacher.service';
import { environment } from '../../environments/environment';
import { Teacher } from './../../app/shared/models/teacher.model'

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ]
    });
    service = TestBed.inject(TeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTeachers should return value from observable',
    (done: DoneFn) => {
    service.getTeachers().subscribe(value => {
    expect(value).toBeTruthy();
    done();
    });
  });

  it('#addTeachers should return value from observable',
    (done: DoneFn) => {
      let teacher = <Teacher> {
        name: 'test',
        classes:[]
      }
      service.addTeacher(teacher).subscribe(value => {
      expect(value.qa).toBeTruthy()
      expect(value.Ua).toBeTruthy()
    done();
    });
  });
  
  it('#removeTeachers should return undefined',
    (done: DoneFn) => {
      let teacher = <Teacher> {
        id:'test',
        name: 'test',
        classes:[]
      }
      service.removeTeacher(teacher).subscribe(value => {
      expect(value).toBeUndefined();
      done();
    });
  });

  // it('#updateTeacher should return undefined',
  //   (done: DoneFn) => {
  //     let teacher = <Teacher> {
  //       id:'test',
  //       name: 'test',
  //       classes:[]
  //     }
  //     service.updateTeacher(teacher).subscribe(value => {
  //     expect(value).toBeUndefined();
  //     done();
  //   });
  // });
});
