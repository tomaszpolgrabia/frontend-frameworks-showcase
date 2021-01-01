import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleIndexComponent} from './people-index/people-index.component';
import {PersonAddComponent} from './person-add/person-add.component';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {PersonFormComponent} from './person-form/person-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PeopleIndexComponent, PersonAddComponent, PersonEditComponent, PersonFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PersonAddComponent,
    PeopleIndexComponent,
  ]
})
export class PeopleModule {
}
