import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PeopleService} from '../people.service';
import {Person} from '../models/person';
import {isValidEmail} from '../utils/validators';
import {PersonSubmitted} from '../models/person-submitted';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  @Input('id') personId: string | null = null;
  @Output('personSubmitted') personSubmitted: EventEmitter<PersonSubmitted>
    = new EventEmitter<PersonSubmitted>();
  loaded = false;

  personForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [isValidEmail], null),
    status: new FormControl(0)
  });

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit(): void {
    if (this.personId && !Number.isNaN(this.personId)) {
      console.log(`Editing person with id ${this.personId}. Editing mode...`);

      this.peopleService.getPersonById(Number.parseInt(this.personId, 10))
        .then(person => {
          this.updatePersonFormWithData(person);
          this.loaded = true;
        }).catch((e) => {
        console.log(`Failed to fetch person with id ${this.personId}`, e);
        this.loaded = true;
      });

    } else {
      console.log('Person id is undefined - adding mode');
      this.loaded = true;
    }
  }

  private updatePersonFormWithData(person: Person): void {
    this.personForm.controls.firstName.setValue(person.firstName);
    this.personForm.controls.lastName.setValue(person.lastName);
    this.personForm.controls.email.setValue(person.email);
    this.personForm.controls.status.setValue(person.status);
  }

  submitPerson(): void {
    console.log('Submitting person...');
    if (!this.personForm.valid) {
      console.log('Data are not valid');
      return;
    }
    const person = this.personForm.value as Person;
    const personUpdate = !!this.personId;
    if (!personUpdate) {
      this.peopleService.createPerson(person as Person)
        .then(p => {
          console.log(`Create succeeded with id ${p.id}`);
          const event = new PersonSubmitted();
          event.id = p.id;
          event.created = personUpdate;
          this.personSubmitted.emit(event);
        }).catch(e => {
        console.log('Create failed');
      });
    } else {
      // person update
      this.peopleService.updatePerson(Number.parseInt(this.personId as string, 10), person)
        .then(r => {
          if (r == null) {
            console.log('Update failed');
            return;
          }
          const event = new PersonSubmitted();
          event.id = r.id;
          event.created = false;
          this.personSubmitted.emit(event);
        });
    }
  }
}
