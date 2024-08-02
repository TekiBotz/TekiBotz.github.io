import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from "./data/users.js";
import User from "./models/userModel.js";
import connectDB from './config/db.js';

dotenv.config();    // Necessary to use enviornment variables

connectDB();


/*
This file is used to insert and delete dummy users into the database
*/
const addData = async () => {
    try {
        await User.deleteMany();     // If the collection exists delete it

        await User.insertMany(users);

        console.log('Users sucessfully added to database!'.green.inverse);      // .green.inverse just adds readability to the colsol log -> npm i colors
        process.exit(0);
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany();     // If the collection exists delete it

        console.log('Users sucessfully deleted from database!'.red.inverse);      // .red.inverse just adds readability to the colsol log
        process.exit(0);
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

/*
// This is used inside (root) package.json script, it will check for the '-d' when running data:add and data:delete to determine which function to run
*/
if (process.argv[2] === '-d') {
    deleteData();
} else {
    addData();
}