import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { of } from 'rxjs';

import { ClassesComponent } from '../../app/components/pages/classes/classes.component';
import { environment } from '../../environments/environment';
import { ClassService } from './../../app/shared/services/class.service'
import { TeacherService } from './../../app/shared/services/teacher.service'

describe('ClassesComponent', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;
  let teacherService: TeacherService;
  let classService: ClassService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ],
      providers: [
        { provide: TeacherService, useValue: { getTeachers: () => of([{ id: 'test', name: 'test', classes: ['test'] }]) } },
        {
          provide: ClassService, useValue: {
            getClasses: () => of([
              {
                id: 'test',
                name: 'test',
                ageRange: [1, 2],
                startTime: 'test',
                endTime: 'test',
                teacher: 'test'
              }
            ])
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    teacherService = TestBed.get(TeacherService)
    classService = TestBed.get(ClassService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getClasses and getTeachers  ', () => {
    spyOn(component, 'getTeachers');
    spyOn(component, 'getClasses');
    component.ngOnInit();
    expect(component.getClasses).toHaveBeenCalled();
    expect(component.getTeachers).toHaveBeenCalled();
  });

  it('#getClasses should load classes', () => {
    let classes = [{
      id: 'test',
      name: 'test',
      ageRange: [1, 2],
      startTime: 'test',
      endTime: 'test',
      teacher: 'test'
    }]

    spyOn(classService, 'getClasses')
      .and
      .callThrough();
    component.getClasses();
    fixture.detectChanges();
    expect(classService.getClasses).toHaveBeenCalled();
    console.log(component.classes)
    expect(component.classes).toEqual(classes);

  });

  it('#getTeachers should load teachers', () => {
    spyOn(teacherService, 'getTeachers')
      .and
      .callThrough();
    component.getTeachers();
    fixture.detectChanges();
    expect(teacherService.getTeachers).toHaveBeenCalled();
    expect(component.teachers).toEqual([{ id: 'test', name: 'test', classes: ['test'] }]);
  });

  it('#setFormView true', () => {
    component.showForm = false;

    component.setFormView(true);

    expect(component.classForm.value).toEqual({ id: null, name: null, startTime: null, endTime: null, startAge: null, endAge: null, teacher: null });
    expect(component.add).toEqual(true);
    expect(component.showForm).toEqual(true);
  });

  it('#setFormView false', () => {
    component.showForm = false;

    component.setFormView(false);

    expect(component.classForm.value).toEqual({ id: null, name: null, startTime: null, endTime: null, startAge: null, endAge: null, teacher: null });
    expect(component.add).toEqual(false);
    expect(component.showForm).toEqual(true);
  });


});
