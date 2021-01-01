import {Injectable} from '@angular/core';
import {Person} from './models/person';
import {PersonSubmitted} from './models/person-submitted';

const CONTENT_TYPE_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  getAllPersons(): Promise<Person[]> {
    return fetch('/api/people')
      .then(it => it.json())
      .then(it => it as Person[]);
  }

  createPerson(person: Person): Promise<Person> {
    return fetch('/api/people', {
      headers: CONTENT_TYPE_HEADERS,
      method: 'PUT',
      body: JSON.stringify(person)
    }).then(resp => {
      if (resp.status === 200) {
        return resp.json().then(body => {
          return Promise.resolve(body as Person);
        }).catch(e => {
          return Promise.reject(e);
        });
      } else {
        return Promise.reject(`Incorrect response status ${resp.status}`);
      }
    }).catch(reason => {
      return Promise.reject(reason);
    });
  }

  getPersonById(personId: number): Promise<Person> {
    return fetch(`/api/people/${personId}`, {
      headers: CONTENT_TYPE_HEADERS,
      method: 'GET'
    }).then(resp => {
      if (resp.status === 200) {
        return resp.json();
      } else {
        return Promise.resolve(null);
      }
    });
  }

  updatePerson(personId: number, updatedPerson: Person): Promise<Person | null> {
    return fetch(`/api/people/${personId}`, {
      headers: CONTENT_TYPE_HEADERS,
      method: 'POST',
      body: JSON.stringify(updatedPerson)
    }).then(resp => {
      if (resp.status === 200) {
        return resp.json().then(e => e as Person);
      } else {
        return Promise.resolve(null);
      }
    });
  }
}
