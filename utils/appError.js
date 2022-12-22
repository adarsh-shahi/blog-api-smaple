class AppError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
		this.status = statusCode >= 500 ? "error" : "fail";
		this.isOperational = true;

			"name too long must be less than equal to 20 characters including spcaes",
		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
