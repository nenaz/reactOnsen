export const loggingMiddleware = (store) => (next) => (action) => {
	// console.log(`Redux Log:`, action)
	return next(action);
};
