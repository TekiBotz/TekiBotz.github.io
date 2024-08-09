import mongoose from 'mongoose';

/**
 * Asynchronous function to connect to MongoDB Atlas using the URI stored 
 * in environment variables
 */
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error: $(error.message)`);
		process.exit(1);
	}
};

export default connectDB;