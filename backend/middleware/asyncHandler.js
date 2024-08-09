/*
* Custom asyncHandler derived from https://expressjs.com/en/guide/error-handling.html.
* This handler "uses promises to avoid the overhead of the try...catch block or when using functions that return promises".
* Catches errors thrown in asynchronous functions and passes them to the errorMiddleware.
*/

/**
 * @param {Function} fn - The asynchronous route handler function to be wrapped.
 * @returns  {Function} - A middleware function that takes req, res, and next as arguments.
 */

const asyncHandler = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;