import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import bcrypt from "bcryptjs";

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const removePassword = (obj) => {
	const user = obj._doc;
	let { password, ...rest } = user;
	return { ...rest };
};

const signup = async (req, res, next) => {
	try {
		if (!req.body.passwordConfirm)
			throw new Error("must contain password confirm");
		if (req.body.password !== req.body.passwordConfirm)
			throw new Error("both passwords should match");
		const password = await bcrypt.hash(req.body.password, 12);
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password,
		});

		res.status(201).json({
			status: "success",
			token: signToken(newUser._id),
			user: {
				newUser,
			},
		});
	} catch (err) {
		next(new AppError(404, err.message));
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password: plainPassword } = req.body;
		if (!email || !plainPassword)
			throw new Error("please provide email and password");
		const isUser = await User.findOne({ email });
		if (!isUser) throw new Error("Email dosen't exist");
		const user = await bcrypt.compare(plainPassword, isUser.password);
		if (!user) throw new Error("password dosen't match");
		res.status(200).json({
			status: "success",
			user: {
				user: removePassword(isUser)
			},
		});
	} catch (err) {
		next(new AppError(404, err.message));
	}
};

export { signup, login };
