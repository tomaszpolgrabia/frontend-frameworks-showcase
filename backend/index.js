const express = require('express');
const fs = require('fs');
const retrieveDb = require('./database.js');

const app = express();
app.use(express.json());

console.log(`Args: ${process.argv}, length: ${process.argv.length}`);
const configUrl = process.argv.length >= 2 ? process.argv[2] : null;
let config = {};
if (configUrl) {
    console.log(`Reading config from ${configUrl}`);
    let data = fs.readFileSync(configUrl, 'utf8');
    if (data) {
        console.log(`Got data: ${data}`);
        config = JSON.parse(data);
        console.log(`Parsed json data ${config} ...`);
        console.log(`Config ${config}`);
    } else {
        console.error('No data...');
    }
} else {
    console.log('No configuration provided...');
}

const port = config?.port || 8000;
const dbUrl = config?.dbUrl || './data/people.dat';

const db = retrieveDb(dbUrl);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        message: 'Index page'
    }));
});

function convertToCamelCased(data) {
    return {
        id: data.id,
        firstName: data['first_name'],
        lastName: data['last_name'],
        email: data['email'],
        status: data['status']
    };
}

app.get('/people/:personId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let personId = req.params.personId;
    db.get('select * from persons p where p.id = ?', [personId], (err, data) => {
        if (!err) {
            if (!data) {
                // no person data found with the given id
                res.status(404);
                res.send(JSON.stringify({}));
                return;
            }

            // I found the user, returning data...
            res.send(JSON.stringify(convertToCamelCased(data)));
        } else {
            console.error('Fetching person with id from database failed', err);
            res.status(500)
                .send(JSON.stringify({}));
        }
    });
});

app.put('/people', (req, res) => {
    console.log(`Put person with data`, req.body);
    let {firstName: firstName, lastName: lastName, email, status} = req.body;

    const stmt = db.prepare('insert into persons (first_name, last_name, email, status) values (?, ?, ?, ?)');
    stmt.run([firstName, lastName, email, status || 0], (serr) => {
        if (!serr) {
            let lastId = stmt.lastID;
            console.log(`Added person with lastId ${lastId}`);
            res.send(JSON.stringify({...req.body, id: lastId}));
        } else {
            console.error('Got error while putting new person', serr);
            res.status(500)
                .send('Internal server error');
        }

    });
});

app.post('/people/:personId', (req, res) => {
    console.log(`Update person with data`, req.body);
    let personId = req.params.personId;
    let {firstName, lastName, email, status} = req.body;

    db.get('select * from persons p where p.id = ?', [personId], (err, data) => {
        if (err) {
            console.log(`Error while checking if person exists with ${personId}`);
            res.status(500).send('');
            return;
        }

        if (!data) {
            res.status(404).send('');
            return;
        }

        console.log(`Person found, updating person with id ${personId} ...`);

        db.run('update persons set first_name = ?, last_name = ?, email = ?, status = ?'
            + ' where id = ?',
            [firstName, lastName, email, status || 0, personId], (err2) => {
                if (!err2) {
                    res.send(JSON.stringify({}));
                } else {
                    console.error('Got error while putting new person', err2);
                    res.status(500)
                        .send('Internal server error');
                }

            });
    });
});

app.delete('/people/:personId', (req, res) => {
    let personId = req.params.personId;
    db.get('select * from persons p where p.id = ?', [personId], (err, data) => {
        if (err) {
            console.error('Got error', err);
            res.status(500).end();
            return;
        }

        if (!data) {
            // there is no record to be deleted
            res.status(404).end();
            return;
        }

        // we are sure that there is a record to delete

        db.run('delete from persons where id = ?', [personId], (err) => {
            if (!err) {
                console.log(`Deleting person with id ${personId} was successful.`);
                res.status(200)
                    .send(JSON.stringify({
                        status: 'OK'
                    }));
            } else {
                console.error(`Got error while deleting person with id ${personId}`, err);
                res.status(500).send(JSON.stringify({
                    status: 'INTERNAL SERVER ERROR',
                    message: `I couldn't delete person with id ${personId}...`,
                }));
            }
        });

    });
});

app.get('/people/', (req, res) => {
    console.log('Getting all people data');
    res.setHeader('Content-Type', 'application/json');
    db.all('select * from persons', (err, data) => {
        if (!err) {
            res.send(JSON.stringify(data.map(r => convertToCamelCased(r))));
        } else {
            console.error('Fetching persons from database failed', err);
            res.send(JSON.stringify([]));
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
