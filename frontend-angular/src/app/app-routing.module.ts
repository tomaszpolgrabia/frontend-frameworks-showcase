import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonAddComponent } from './people-module/person-add/person-add.component';
import { PersonEditComponent } from './people-module/person-edit/person-edit.component';
import { PeopleIndexComponent } from './people-module/people-index/people-index.component';

const routes: Routes = [{
  path: '',
  component: PeopleIndexComponent,
}, {
  path: 'people',
  component: PeopleIndexComponent,
}, {
  path: 'people/add',
  component: PersonAddComponent,
}, {
  path: 'people/edit/:personId',
  component: PersonEditComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
