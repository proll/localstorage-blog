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
		if(this.get('action') === 'add') {
			this.set('key', Date.now());
		}

		this.view = new lstb.PostPageView({
			model: this, 
			template:"pages/post-page"
		});

		this.view.render();

		this.post = new lstb.Post(this.toJSON());
		this.view.addPost(this.post);

		this.post.activate();
		this.post.on('save', this.recreate, this);

		this.hSfunc = _.bind(this.handleStorage, this);

		if (window.addEventListener) {
			window.addEventListener('storage', this.hSfunc, false);
		} else {
			window.attachEvent("onstorage", this.hSfunc);
		};
	},

	handleStorage: function(e) {
		if (!e) { 
			e = window.event; 
		}
		// rerender if DATA is for this post
		if(e.key === this.get('key')) {
			this.remove();
			this.render();
		}
	},

	recreate: function() {
		console.log('save')
		lstb.navigate('/post/' + this.get('key') + '/', {trigger: true});
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

		if(window.removeEventListener) {
			window.removeEventListener('storage', this.hSfunc)
		} else {
			window.detachEvent("onstorage", this.hSfunc);
		}
	}
});