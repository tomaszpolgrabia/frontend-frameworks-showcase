import {Component, OnInit} from '@angular/core';
import {Person} from '../models/person';
import {PeopleService} from '../people.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-people-index',
  templateUrl: './people-index.component.html',
  styleUrls: ['./people-index.component.scss']
})
export class PeopleIndexComponent implements OnInit {
  persons: Person[] = [];

  constructor(
    private peopleService: PeopleService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.peopleService
      .getAllPersons()
      .then(persons => {
        this.persons = persons;
      });
  }

  editPerson(id: number): void {
    this.router.navigate(['/people/edit/', id]);
  }
}
