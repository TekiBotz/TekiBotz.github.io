import express from 'express';
import dotenv from 'dotenv';
dotenv.config();    // This line needs to be called before you use an enviornment variable
import animals from './data/animals.js';
const port = process.env.PORT || 4000;

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Displays all animals
app.get('/api/animals', (req, res) => {
    res.json(animals);
});

// Displays individual animals
app.get('/api/animals/:id', (req, res) => {
    const animal = animals.find((a) => a._id === req.params.id);
    res.json(animal);
});

app.listen(port, () => console.log(`Server running on port ${port}`));