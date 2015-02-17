lstb.PostPage = lstb.Page.extend({
	visited: false,

	defaults: {
		key: 0,
		action: 'view',
	},

	initialize: function(options){
		options 		= options || {};
	},
	render: function(options) {
		this.set(options);
		this.visited = true;

		this.view = new lstb.PostPageView({
			model: this, 
			template:"pages/post-page"
		});

		this.view.render();

		this.post = new lstb.Post(options);
		this.view.addPost(this.post);

		this.post.activate();
	},


	successLoadContext: function() {
		this.set("loading", false);
	},




	sleep: function () {
		this.remove();
	},

	remove: function () {
		this.off();
		if(this.post) {
			this.post.off();
			this.post.remove();
		}
		if(this.view) {
			this.view.off();
			this.view.remove();
		}
	}
});