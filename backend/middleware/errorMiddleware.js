/**
 * Project: AnimalRescue
 * File: middleware/errorMiddleware.js
 * Author: Jarrale Butts
 * Created: 2024-09-24
 * Purpose: Middleware for handling 404 errors for unmatched 
 *          routes and handling general errors in the application.
 */

/**
 * Middleware to handle 404 errors for unmatched routes
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const notFound = (req, res, next) => {
  // Create an error object with a message indicating the URL was not found
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // Set the response status code to 404 (Not Found)
  res.status(404);
  // Pass the error to the next middleware (error handler)
  next(error);
};


/**
 * Middleware to handle errors
 * 
 * @param {Object} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Determine the status code: if not already set, default to 500 (Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

   // Extract the error message
  let message = err.message;

  // Respond with the error message and stack trace (if not in production)
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };