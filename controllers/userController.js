import User from "../models/userModel";
import AppError from "../utils/appError";

const updateUser = (req, res, next) => {
	try {
		const { username, email } = req.body;
    if(!username || !email) throw new Error("please provide a valid update email or password")
    
	} catch (e) {
		next(new AppError(401, e.message));
	}
};

export { updateUser };
