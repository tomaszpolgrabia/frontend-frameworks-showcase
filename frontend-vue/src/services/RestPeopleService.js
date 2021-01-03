import {REST_CONTENT_TYPE_HEADERS} from "../utils/constants";

export default class RestPeopleService {
    getAllPeople() {
        return fetch('/api/people', {
            headers: {...REST_CONTENT_TYPE_HEADERS}
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                return Promise.reject(`Got invalid response code when fetching people: ${resp.status}`);
            }
        });
    }

    getPersonById(personId) {
        return fetch(`/api/people/${personId}`, {
            headers: {...REST_CONTENT_TYPE_HEADERS}
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                return Promise.reject(`Got invalid response code while fetching person data ${resp.status}`);
            }
        })
    }

    updatePerson(personId, person) {
        return fetch(`/api/people/${personId}`, {
            headers: {...REST_CONTENT_TYPE_HEADERS},
            method: 'POST',
            body: JSON.stringify(person)
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                return Promise.reject(`Got invalid response code while updating person data ${resp.status}`);
            }
        });
    }

    createPerson(person) {
        return fetch(`/api/people`, {
            headers: {...REST_CONTENT_TYPE_HEADERS},
            method: 'PUT',
            body: JSON.stringify(person)
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                return Promise.reject(`Got invalid response code while creating person data ${resp.status}`);
            }
        });
    }
}
