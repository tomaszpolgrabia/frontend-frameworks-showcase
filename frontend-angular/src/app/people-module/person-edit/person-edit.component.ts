import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonSubmitted} from '../models/person-submitted';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  personId = -1;
  invalidId = false;
  loaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.personId = Number.parseInt(params.personId, 10) as number;
      this.invalidId = Number.isNaN(this.personId);
    });
  }

  personLoaded(): void {
    this.loaded = true;
  }

  personUpdated(e: PersonSubmitted): void {
    console.log(`Person ${e.created ? 'created' : 'updated'} with id: ${e.id}`);
    this.router.navigate(['/people']);
  }
}
