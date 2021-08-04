const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const Post = mongoose.model('Post');

exports.signUp = (req, res, next) => {
	const newUser = new User ({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password
	});

	//save the new user
	newUser.save((err) => {
		if(err){
			res.send({success: false});
		} else {
			res.send({success: true});
		}
	});
}

exports.logIn = (req, res, next) => {
	const email = req.body.email.trim();
	const password = req.body.password;

	//check if email exists
	User.findOne({email}, (err, user) => {
		//user doesnt exists
		if(err || !user){
			return res.send({success: false});
		}

		//check if password incorrect
		user.comparePassword(password, (err, isMatch) => {
			//password incorrect
			if(err || !isMatch){
				return res.send({success: false});
			}
	
			//successful authentication
			const tokenPayload = {
				_id: user._id
			}

			const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");
			return res.send({success: true, token, username: user.firstName + " " + user.lastName, _id: user._id})
		});
	});
}

exports.viewFeed = (req, res, next) => {

	if(!req.cookies || !req.cookies.authToken) {
		//no cookies / no authToken cookie sent
		return res.send({ isLoggedIn: false });
	}

	//Token is present, validate it
	return jwt.verify(
		req.cookies.authToken,
		"THIS_IS_A_SECRET_STRING",
		(err, tokenPayload) => {
			if(err) {
				//error validating token
				return res.send({isLoggedIn: false});
			}

			const userId = tokenPayload._id;

			//check if user exists
			return User.findById(userId, (userErr, user) => {
				if(userErr || !user) {
					//failed to find user based on id inside token payload
					return res.send({isLoggedIn: false});
				}

				//success - token and user id are valid
				return res.send({isLoggedIn: true});
			});
			
		}
	)
}

exports.viewProfile = (req, res, next) => {

  if (!req.body._id) { return res.send('No id provided') }

	//finds all the post/s of the user sorted from most recent and gets the firstName and lastName 
	Post.find({author: req.body._id}).populate({ path: 'author', select: 'firstName lastName'}).sort([['timestamp', -1]]).exec(function(err, post) {
		if(err) return res.send({success: false})
		else {
			return res.send({success: true, posts: post});
		}
	})

}

exports.createPost = (req, res, next) => {

	const newPost = new Post ({
		author: req.body.author,
		timestamp: req.body.timestamp,
		content: req.body.content
	});

	//save the new post to the database
	newPost.save((err) => {
		if(err){
			res.send({postSuccess: false});
		} else {
			res.send({postSuccess: true});
		}
	});

}

exports.showPost = (req, res, next) => {

	//returns the elements in the friendList of the user
	const people = User.findOne({_id: req.body._id}, {friendList: 1})

	people.exec((err, user) => {
		if(err) {return res.send({success: false})}
		else {
			//gets the posts of the user and the user's friends with their names sorted from most recent
			Post.find({$or: [
				{author: user._id},
				{author: {$in: user.friendList}}
				]}).populate({ path: 'author', select: 'firstName lastName' }).sort([['timestamp', -1]]).exec((err, post)=> {
				if(!err){
					return res.send({success: true, posts: post})
				} else {
					return res.send({success: false})
				}
			})
		}
	})

}

exports.editPost = (req, res, next) => {

	//finds the _id of the post and update timestamp and content field
	Post.updateOne({_id: req.body._id}, {$set: {timestamp: req.body.timestamp, content: req.body.content}}, (err, posts) => {
		if(err){
			res.send({edited: false})
		} else {
			res.send({edited: true})
		}
	})

}

exports.deletePost = (req, res, next) => {

	if (!req.body._id) { return res.send('No id provided') }

	//finds the _id of a post and delete 
	Post.findOneAndDelete({_id: req.body._id}, (err, post) => {
		if(!err && post){
			return res.send({success: true})
		}
		else {
			return res.send({success: false})
		}
	})
}

exports.findUser = (req, res, next) => {

	const query = req.body.search

	//finds users who matches the query either with their first or last names
	User.find({$or: [
		{firstName: {$regex: query, $options: 'i'}}, 
		{lastName: {$regex: query, $options: 'i'}}
		]}, {firstName: 1, lastName: 1}, (err, user) => {
		if(err){
			return res.send({success: false});  
		} else {
			return res.send({success: true, users: user})
		}
	})
}

exports.userProfile = (req, res, next) => {
	if (!req.body.id) { return res.send('No id provided') }

	//finds a user with the _id and return only the firstName, lastName and email fields
	User.findOne({ _id:req.body.id}, {firstName: 1, lastName: 1, email: 1}, (err, user) => {
		if(!err) {
			return res.send({success: true, user: user})
		} else {
			return res.send({success: false})
		}
	})
}

//send friend request only to those you haven't send fr yet and those who haven't added you
exports.findPeople = (req, res, next) => {
	
	//find a user with the _id and get the user's lists of received and sent requests and friends lists limited to three users
	const people = User.findOne({_id: req.body._id}, {receivedRequestList:1, sentRequestList: 1, friendList:1}).limit(3)

	//find all users who is not the user, not in the friend list, sent request and received request list
	people.exec((err, user) => {
		if(err){
			return res.send({success: false})
		} else {
			User.find({$and: [
				{_id: {$ne: req.body._id}},
				{_id: {$nin: user.friendList}},
				{_id: {$nin: user.receivedRequestList}},
				{_id: {$nin: user.sentRequestList}}
			]}, {firstName: 1, lastName: 1}, {limit: 3}, (err, users) => {
				if(!err) {
					return res.send({success: true, users: users})
				}
				else {
					return res.send({success: false})
				}
			})
		}
	})

}

exports.addFriend = (req, res, next) => {

	//finds a user with the _id and add the _id of the another user to the user's sent request list
	User.updateOne({_id: req.body.userID}, {$push: {sentRequestList: {_id: req.body.friendID}}}, (err) => {
		if(err){ res.send({success: false}) } 
		else {
			//find the other user with the _id and add the _id of the user to the other user's received request list
			User.updateOne({_id: req.body.friendID}, {$push: {receivedRequestList: {_id: req.body.userID}}}, (err) => {
				if(err) { res.send({success: false}) }
				else { res.send({success: true}) }
			})
		}
	})

}

exports.displayFriends = (req, res, next) => {

	//find a user with _id and return the elements of the friends list with names
	User.findOne({_id: req.body._id}, {'friendList._id': 1}).populate({path: 'friendList._id', select: 'firstName lastName'}).limit(3).exec((err, user) => {
		if(err){
			return res.send({success: false})
		} else {
			return res.send(user.friendList)
		}
	})

}

exports.displayRequest = (req, res, next) => {

	//find a user with _id and return the elements of the received request list with names limited to three
	User.findOne({_id: req.body._id}, {'receivedRequestList': 1}).populate({path: 'receivedRequestList._id', select: 'firstName lastName'}).limit(3).exec((err, user) => {
		if(err){
			return res.send({success: false})
		} else {
			return res.send(user.receivedRequestList)
		}
	})

}

exports.acceptFriend = (req, res, next) => {

	//finds a user with req.body.userID and remove element that is req.body.friendID in the received list of of the user,
	//remove the req.body.userID of the req.body.friendID in the sent request list 
	//and add each other's id in their friends list
	User.updateOne({_id: req.body.userID}, {$pull: {receivedRequestList: {_id: req.body.friendID}}}, (err) => {
		if(err) {return res.send({success: false})}
		else {
			User.updateOne({_id: req.body.friendID}, {$pull: {sentRequestList: {_id: req.body.userID}}}, (err) => {
				if(err) {return res.send({success: false})}
				else {
					User.updateOne({_id: req.body.userID}, {$push: {friendList: {_id: req.body.friendID}}}, (err) => {
						if (err) {return res.send({success: false})}
						else {
							User.updateOne({_id: req.body.friendID}, {$push: {friendList: {_id: req.body.userID}}}, (err) => {
								if (err) {return res.send({success: false})}
								else {
									return res.send({success: true})
								}
							})
						}
					})
				}
			})
		}
	})

}

exports.deleteFriend = (req, res, next) => {
	
	//finds a user with _id req.body.userID and remove the element that is req.body.friendID in the received list,
	//and remove the req.body.userID of the req.body.friendID in the sent request list
	User.updateOne({_id: req.body.userID}, {$pull: {receivedRequestList: {_id: req.body.friendID}}}, (err) => {
		if(err) {return res.send({success: false})}
		else {
			User.updateOne({_id: req.body.friendID}, {$pull: {sentRequestList: {_id: req.body.userID}}}, (err) => {
				if(err) {return res.send({success: false})}
				else {
					return res.send({success: true})
				}
			})
		}
	})

}