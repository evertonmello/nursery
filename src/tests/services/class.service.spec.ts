import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../../environments/environment';
import { ClassService } from '../../app/shared/services/class.service';

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
});
