import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		maxlength: [
			20,
			"name too long must be less than equal to 20 characters including spcaes",
		],
		minlength: [3, "name too short must be greater than equal to 3 characters"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "user must have a email"],
		lowercase: true,
		validate: {
			validator: validator.isEmail,
			message: `Enter a valid email`,
		},
		password: {
			type: String,
			required: [true, "user should have a password"],
			minlength: 8,
			select: false, // will never show up in any output but will be saved in DB
		},
		passwordConfirm: {
			type: String,
			required: [true, "user should have a confirem password"],
			minlength: 8,
			validate: {
				// This only works on CREATE and SAVE
				validator: function (passConfirm) {
					return passConfirm === this.password;
				},
				message: `Passwords doesn't match`,
			},
		},
	},
});

const User = new mongoose.model("User", userSchema);

export default User;
