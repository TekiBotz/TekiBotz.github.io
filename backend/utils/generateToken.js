import jwt from "jsonwebtoken";

// Generates a JSON Web Token (JWT)
const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRETE, {
		expiresIn: '1d',
	});

	// Set JWT as HTTP-only cookie
	res.cookie('jwt', token, {
		httpOnly: true,  // Prevent JavaScript access to the cookie
		secure: process.env.NODE_ENV !== 'development',  // Use secure cookies in production
		sameSite: 'strict',  // Restrict sending cookies with cross-site requests
		maxAge: 1 * 24 * 60 * 60 * 1000, // Expired after 1 Day (in milliseconds)
	});
};

export default generateToken;