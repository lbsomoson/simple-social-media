const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	friendList: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }}],
	receivedRequestList: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }}],
	sentRequestList: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }}]

});


UserSchema.pre('save', function(next) {
	const user = this;

	if(!user.isModified("password")) return(next);

	return bcrypt.genSalt((saltError, salt) => {
		if (saltError) {return next(saltError);}

		return bcrypt.hash(user.password, salt, (hashError, hash) => {
			if(hashError) {return next(hashError);}
			user.password = hash;
			return next();
		});
	});
});

UserSchema.methods.comparePassword = function(password, callback) {
	bcrypt.compare(password, this.password, callback);
}

module.exports = mongoose.model("User", UserSchema);