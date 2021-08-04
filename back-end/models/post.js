const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	timestamp: {type: Date, default: Date.now, required: true},
	content: {type: String, required: true}
});

module.exports = mongoose.model("Post", PostSchema);