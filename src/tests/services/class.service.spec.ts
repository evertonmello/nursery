import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../../environments/environment';
import { ClassService } from '../../app/shared/services/class.service';
import { SClass } from './../../app/shared/models/sclass.model'

describe('ClassService', () => {
  let service: ClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ]
    });
    service = TestBed.inject(ClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getClasses should return value from observable',
    (done: DoneFn) => {
      service.getClasses().subscribe(value => {
        expect(value).toBeTruthy();
        done();
      });
    });

  it('#addClasses should return value from observable',
    (done: DoneFn) => {
      let sclass = <SClass>{
        id: 'test',
        name: 'test',
        ageRange: [1, 2],
        startTime: 'test',
        endTime: 'test',
        teacher: 'test'
      }
      service.addClass(sclass).subscribe(value => {
        expect(value.qa).toBeTruthy()
        expect(value.Ua).toBeTruthy()
        done();
      });
    });

  it('#removeClasses should return undefined',
    (done: DoneFn) => {
      let sclass = <SClass>{
        id: 'test',
        name: 'test',
        ageRange: [1, 2],
        startTime: 'test',
        endTime: 'test',
        teacher: 'test'
      }
      service.removeClass(sclass).subscribe(value => {
        expect(value).toBeUndefined();
        done();
      });
    });
});
