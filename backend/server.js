import express from 'express';
import dotenv from 'dotenv';
dotenv.config();    // This line needs to be called before you use an enviornment variable
import connectDB from './config/db.js';
import animalRoutes from './routes/animalRoutes.js';
const port = process.env.PORT || 4000;
// import { from } from 'rxjs';

connectDB();    // Connect to MongoDB Atlas

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/animals', animalRoutes);      // Whenever /api/animals is accessed it will be routed to the file animalRoutes.js

app.listen(port, () => console.log(`Server running on port ${port}`));