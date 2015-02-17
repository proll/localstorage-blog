lstb.PostItemList = Backbone.Model.extend({
	collection: null,
	
	defaults: {
		offset: 	0,
		limit: 		10,

		loading: 	false,
		sleeped: 	true,
		scrollload: true,

		url: 		"/posts/"
	},

	initialize: function (options) {
		if(_.isPhone() || _.isPhone2()) {
			this.set('addphoto', false);
		}


		this.collection = new lstb.PostItemCollection();
		this.collection.url = this.get('url');

		this.collection.on("load:success", function () {
							this.set("offset", this.get("offset") + this.get("limit"));
							this.set("loading", false);
						}, this)
						.on("load:error", function () {
							console.error("postitem_list:load:error")
							this.set("loading", false);
						}, this)
						.on("load:start", function () {
							this.set("loading", true);
						}, this)
						.on("add", this.addPost, this)
						.on("reset", this.resetPosts, this);

		this.view = new lstb.PostItemListView({
			collection:this.collection, 
			model: this
		});

		this.on("needmore", this.needMore, this);


		if(this.get("scrollload")) {
			lstb.on("pagebottom:reached context:needmore", function () {
				this.trigger("needmore");
			}, this);
		}



	},

	addPost: function (model, collection, options) {
		model.fetch();
	},

	resetPosts: function  (collection, options) {
		_.each(options.previousModels, function (model, key, list) {
			model.remove();	
		})
		this.collection.more = true;
	},

	needMore: function () {
		if(!this.get("loading") && !this.get("sleeped")) {
			var data = _.extend({
				offset: this.get('offset'),
				limit: this.get('limit')
			});

			this.collection.fetch({data: data}); 
		}
	},

	reset: function () {
		this.collection.reset();
		this.set("offset", this.defaults.offset);
		this.collection.reset();
		this.trigger("needmore");
		return false;
	},

	reload: function () {
		this.reset();
		this.trigger("needmore");
	},

	activate: function() {
		this.collection.reset();
		this.set("offset", this.defaults.offset);
		this.set("sleeped", false);
		this.trigger("needmore");

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

		console.log(e);
		var posts = []

		if(e.key) {
			// if we have post in loaded collection
			if(this.collection.length) {
				posts = this.collection.where({key: parseInt(e.key)});
				if(posts.length) {
					_.forEach(posts, function(post_model) {
						post_model.set(_.toJSON(e.newValue));
						post_model.fetch();
					})
				} else {
					posts = lstb.dataStorage.getData('/posts/');
					if(!posts || !posts.length) {
						posts = [];
					}
					if( !e.oldValue ) {
						this.collection.unshift(_.toJSON(e.newValue))
					} else {
						// if we have NO post in loaded collection and at all
						// DO NOTHING
					}
				}
			}
		}
	},

	sleep: function() {
		this.set("sleeped", true);

		if(window.removeEventListener) {
			window.removeEventListener('storage', this.hSfunc)
		} else {
			window.detachEvent("onstorage", this.hSfunc);
		}
	},
});