import { Student } from './../app/shared/models/student.model';

describe('Student', () => {
  it('should create an instance', () => {
    expect(new Student()).toBeTruthy();
  });
});
