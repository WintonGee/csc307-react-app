import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

const characters = [
      {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },
];

function MyApp() {
    const [characters, setCharacters] = useState([]);

    async function removeOneCharacter(index, id) {
      const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
        const delResponse = await axios.delete(`http://localhost:8000/users/${id}`)
        // TODO double check the status is being sent
        .then(response => {
            delResponse.status(204).send();
          })
          .catch(error => {
            delResponse.status(404).send();
          });
          console.log(delResponse.status);
    }

    function updateList(person) {
       makePostCall(person).then( result => {
       if (result && result.status === 201) {
        const newPerson = result.data;
        setCharacters([...characters, newPerson] );
       }
       });
    }

    async function fetchAll(){
       try {
          const response = await axios.get('http://localhost:8000/users');
          return response.data.users_list;
       }
       catch (error){
          //We're not handling errors. Just logging into the console.
          console.log(error);
          return false;
       }
    }

    useEffect(() => {
       fetchAll().then( result => {
          if (result)
             setCharacters(result);
        });
    }, [] );

    async function makePostCall(person){
       try {
          const response = await axios.post('http://localhost:8000/users', person);
          return response;
       }
       catch (error) {
          console.log(error);
          return false;
       }
    }

    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    )
}

export default MyApp;