const CONTENT_TYPE_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export class PeopleService {
    getAllPeople() {
        return fetch('/api/people', {
            headers: {...CONTENT_TYPE_HEADERS}
        }).then(resp => {
            if (resp.status !== 200) {
                return Promise.reject(`Got invalid response status code: ${resp.status}`);
            } else {
                return resp.json();
            }
        });
    }

    getPersonById(personId) {
        return fetch(`/api/people/${personId}`, {
            headers: {...CONTENT_TYPE_HEADERS}
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else if (resp.status === 404) {
                return Promise.resolve(null);
            } else {
                return Promise.reject(`Got invalid response status code: ${resp.status}`);
            }
        });
    }

    createPerson(person) {
        return fetch('/api/people', {
            headers: {...CONTENT_TYPE_HEADERS},
            method: 'PUT',
            body: JSON.stringify(person)
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                return Promise.reject(`Got while invalid response status code: ${resp.status}`);
            }
        });
    }

    updatePerson(personId, personData) {
        return fetch(`/api/people/${personId}`, {
            headers: {...CONTENT_TYPE_HEADERS},
            method: 'POST',
            body: JSON.stringify(personData)
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                return Promise.reject(`Got while invalid response status code: ${resp.status}`);
            }
        });
    }
}
