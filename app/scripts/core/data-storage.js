lstb.DataStorage = Backbone.Model.extend({
	defaults: {
	},

	initialize: function(options){
		options 		= options || {};
	},

	getData: function(key, params) {
		var that = this;
		if(key === '/posts/') {
			var posts = _.toJSON(localStorage.getItem(key)),
				posts_count = posts ? posts.length : 0;

			if(posts && posts_count) {
				if(params.offset < posts_count) {
					posts = posts.slice( params.offset, params.offset + params.limit );
					return {
						more: (params.offset + params.limit) < posts_count,
						data: _.map(posts, function(post_key) {
							if(post_key !== '/posts/') {
								return _.extend(that.getData(post_key), {key: post_key});
							} else {
								return false;
							}
						})
					}
				} else {
					return {
						more: false,
						data: []
					}
				}
			} else {
				return false;
			}
		} else {
			return _.toJSON(localStorage.getItem(key));
		}
	}
});