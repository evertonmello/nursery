import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { of } from 'rxjs';

import { StudentsComponent } from '../../app/components/pages/students/students.component';
import { environment } from '../../environments/environment';
import { ClassService } from './../../app/shared/services/class.service'
import { StudentService } from './../../app/shared/services/student.service'

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let classService: ClassService;
  let studentService: StudentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ],
      providers: [
        {
          provide: StudentService, useValue: {
            getStudents: () => of([
              {
                id: 'testStd',
                name: 'testStd',
                age: 1,
                class: 'testStd',
                photo: 'testStd',
                responsible: 'testStd'
              }
            ])
          }
        },
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
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    studentService = TestBed.get(StudentService)
    classService = TestBed.get(ClassService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getStudents and getClasses  ', () => {
    spyOn(component, 'getStudents');
    spyOn(component, 'getClasses');
    component.ngOnInit();
    expect(component.getClasses).toHaveBeenCalled();
    expect(component.getStudents).toHaveBeenCalled();
  });

  it('#getStudents should load students', () => {
    spyOn(studentService, 'getStudents')
      .and
      .callThrough();
    component.getStudents();
    fixture.detectChanges();
    let students = [{
      id: 'testStd',
      name: 'testStd',
      age: 1,
      class: 'testStd',
      photo: 'testStd',
      responsible: 'testStd'
    }
    ]
    expect(studentService.getStudents).toHaveBeenCalled();
    expect(component.students).toEqual(students);
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

  it('#setFormView true', () => {
    component.showForm = false;

    component.setFormView(true);

    expect(component.studentForm.value).toEqual({ id: null, name: null, responsible: null, age: null, class: null });
    expect(component.add).toEqual(true);
    expect(component.showForm).toEqual(true);
  });

  it('#setFormView false', () => {
    component.showForm = false;

    component.setFormView(false);

    expect(component.studentForm.value).toEqual({ id: null, name: null, responsible: null, age: null, class: null });
    expect(component.add).toEqual(false);
    expect(component.showForm).toEqual(true);
  });
});

