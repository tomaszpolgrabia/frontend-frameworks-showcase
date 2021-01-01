import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonFormComponent} from './person-form.component';
import {PeopleService} from "../people.service";
import {Person} from "../models/person";

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;
  let service: jasmine.SpyObj<PeopleService>;

  beforeEach(async () => {
    const spyValue = jasmine.createSpyObj('PeopleService', ['createPerson']);
    await TestBed.configureTestingModule({
      declarations: [PersonFormComponent],
      providers: [
        {
          provide: PeopleService,
          useValue: spyValue
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(PeopleService) as jasmine.SpyObj<PeopleService>;
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with an incorrect email', () => {
    component.personForm.controls.email.setValue('t');
    expect(component.personForm.controls.email.errors).toBeTruthy();
  });

  it('should create form with an correct email', () => {
    component.personForm.controls.email.setValue('do-not-reply@gmail.com');
    expect(component.personForm.controls.email.errors).toBeFalsy();
  });

  it('should submit created form', () => {
    const fakePerson: Person = new Person();
    fakePerson.id = 1;
    fakePerson.firstName = 'Tomasz';
    fakePerson.lastName = 'Półgrabia';
    fakePerson.email = 'test@gmail.com';
    fakePerson.status = 0;

    service.createPerson.and.callFake((person: Person) => {
      person.id = fakePerson.id;
      return Promise.resolve(person);
    });
    component.personForm.controls.firstName.setValue(fakePerson.firstName);
    component.personForm.controls.lastName.setValue(fakePerson.lastName);
    component.personForm.controls.email.setValue(fakePerson.email);
    component.personForm.controls.status.setValue(fakePerson.status);
    component.submitPerson();
    expect(service.createPerson.calls.count()).toBe(1);
    const p = service.createPerson.calls.first().args[0];
    expect(p.firstName).toEqual(fakePerson.firstName);
    expect(p.lastName).toEqual(fakePerson.lastName);
    expect(p.email).toEqual(fakePerson.email);
    expect(p.status).toEqual(fakePerson.status);
    // we need to make some assertions on output personCreated event
  });
});
