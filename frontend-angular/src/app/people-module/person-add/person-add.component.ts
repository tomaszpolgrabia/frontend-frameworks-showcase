import {Component, OnInit} from '@angular/core';
import {PersonSubmitted} from '../models/person-submitted';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.scss']
})
export class PersonAddComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  personCreated(event: PersonSubmitted): void {
    console.log(`Person ${event.created ? 'created' : 'updated'} with id ${event.id}`);
    this.router.navigate(['/people']);
  }
}
