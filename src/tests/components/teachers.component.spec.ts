import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { of } from 'rxjs';

import { environment } from '../../environments/environment';
import { TeachersComponent } from '../../app/components/pages/teachers/teachers.component';
import { TeacherService } from './../../app/shared/services/teacher.service'
import { ClassService } from './../../app/shared/services/class.service'

describe('TeachersComponent', () => {
  let component: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;
  let teacherService: TeacherService;
  let classService: ClassService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersComponent],
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
    fixture = TestBed.createComponent(TeachersComponent);
    component = fixture.componentInstance;
    teacherService = TestBed.get(TeacherService)
    classService = TestBed.get(ClassService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getTeacher and getClasses  ', () => {
    spyOn(component, 'getTeacher');
    spyOn(component, 'getClasses');
    component.ngOnInit();
    expect(component.getClasses).toHaveBeenCalled();
    expect(component.getTeacher).toHaveBeenCalled();
  });


  it('#getTeachers should load teachers', () => {
    spyOn(teacherService, 'getTeachers')
      .and
      .callThrough();
    component.getTeacher();
    fixture.detectChanges();
    expect(teacherService.getTeachers).toHaveBeenCalled();
    expect(component.teachers).toEqual([{ id: 'test', name: 'test', classes: ['test'] }]);
  });

  it('#getClasses should load classes', () => {
    let classes = [{
      value: 'test',
      viewValue: 'test'
    },{
      value: 'test',
      viewValue: 'test'
    }]

    spyOn(classService, 'getClasses')
      .and
      .callThrough();
    component.getClasses();
    fixture.detectChanges();
    expect(classService.getClasses).toHaveBeenCalled();
    console.log("!!!!!!!!!!!")
    console.log("!!!!!!!!!!!")
    console.log("!!!!!!!!!!!")
    console.log(component.classes)
    expect(component.classes).toEqual(classes);

  });

  it('save add true', () => {
    spyOn(component, 'addClass');
    component.add = true;
    component.save();
    expect(component.addClass).toHaveBeenCalled();
  });

  it('save add false', () => {
    spyOn(component, 'updateClass');
    component.add = false;
    component.save();
    expect(component.updateClass).toHaveBeenCalled();
  });

  it('#setFormView true', () => {
    component.showForm = false;

    component.setFormView(true);

    expect(component.teacherForm.value).toEqual({ id: null, name: null, classes_ids: null });
    expect(component.add).toEqual(true);
    expect(component.showForm).toEqual(true);
  });

  it('#setFormView false', () => {
    component.showForm = false;

    component.setFormView(false);

    expect(component.teacherForm.value).toEqual({ id: null, name: null, classes_ids: null });
    expect(component.add).toEqual(false);
    expect(component.showForm).toEqual(true);
  });
});
