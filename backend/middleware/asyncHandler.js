/*
Custom asyncHandler derived from https://expressjs.com/en/guide/error-handling.html
This handler allows for the avoidence of repetitive try catch  blocks
by catching errors thrown in asynchronous functions and passing them to the next error handling middleware
*/

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;