import express from 'express';
import cors from 'cors';
import Chance from 'chance';

//initialize the express app
const app = express();
app.use(cors());
app.use(express.json());

// Make some animals
const chance = new Chance();

const animals = [...Array(250).keys()].map(id => {
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name(),
    }
});

// Endpoint to search for animals
app.get('', (req, res) => {
    // filter results by query
    const query = req.query.q?.toLowerCase() || '';
    const results = animals.filter(animal => animal.type.toLowerCase().includes(query));

    res.send(results);
});

app.listen(8080, () => console.log('Server started on port 8080 http://localhost:8080'));

