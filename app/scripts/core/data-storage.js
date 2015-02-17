lstb.DataStorage = Backbone.Model.extend({
	defaults: {
	},

	initialize: function(options){
		options 		= options || {};
	},

	getPortionData: function(key, params) {
		var that = this,
			posts = _.toJSON(localStorage.getItem(key)),
			posts_count = posts ? posts.length : 0;

		if(posts && posts_count) {
			if(params.offset < posts_count) {
				posts = posts.slice( params.offset, params.offset + params.limit );
				return {
					more: (params.offset + params.limit) < posts_count,
					data: _.map(posts, function(post_key) {
						return _.extend(that.getData(post_key), {key: post_key});
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
	},

	getData: function(key) {
		return _.toJSON(localStorage.getItem(key));
	},

	setData: function(key, obj) {
		return localStorage.setItem(key, _.toJSONString(obj));
	}
});