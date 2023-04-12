const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
   users_list :
   [
      {
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123',
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222',
         name: 'Mac',
         job: 'Professor',
      },
      {
         id: 'yat999',
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555',
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

// Finding a user, provided the id, (id is unique)
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// POST: Adding a user
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).end();
});

function addUser(user){
    users['users_list'].push(user);
}

// Delete (Part 7)
// Only keeps the users without the provided id
app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    users['users_list'] = users['users_list'].filter( (user) => user['id'] !== id);
    res.status(200).end();
});

// Find user by name and job (Part 7)
// Had to remove the code from Part 4 for this to work
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameJob(name, job);
        result = {users_list: result};
        res.send(result);
    } else if (name !== undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    } else if (job !== undefined) {
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else {
        res.send(users);
    }
});

const findUserByNameJob = (name, job) => {
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}

const findUserByJob = (job) => {
    return users['users_list'].filter( (user) => user['job'] === job);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});