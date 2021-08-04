const controller = require('./controller');

module.exports = (app) => {

	app.post('/sign-up', controller.signUp);
	app.post('/log-in', controller.logIn);
	app.post('/feed', controller.viewFeed);
	app.post('/profile', controller.viewProfile);
	app.post('/feed-create-post', controller.createPost);
	app.post('/find-user', controller.findUser);
	app.post('/user-profile', controller.userProfile);
	app.post('/show-post', controller.showPost);
	app.delete('/delete-post', controller.deletePost);
	app.post('/edit-post', controller.editPost);
	app.post('/find-people', controller.findPeople);
	app.post('/add-friend', controller.addFriend);
	app.post('/accept-friend', controller.acceptFriend);
	app.delete('/delete-friend', controller.deleteFriend);
	app.post('/display-friends', controller.displayFriends);
	app.post('/display-request', controller.displayRequest);
	
}