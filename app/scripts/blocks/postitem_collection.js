lstb.PostItemCollection = Backbone.Collection.extend({
	model: lstb.PostItem,
	more: true,
	total: 0,
	xhr: null,

	// 
	// we need only the list of photos
	// ______________________________
	parse: function(resp, options) {
		resp = _.toJSON(resp);
		console.log(resp)
		if(!!resp.photos) {

			this.more = resp.photos.more;
			this.total = resp.photos.total;

			if(!!resp.photos.list) {
				return resp.photos.list;
			} else {
				return false;
			}
		}

	},

	// 
	// it have to add only
	// ______________________________
	fetch: function (options) {
		if(this.more) {
			
			var data = options.data || {
				offset: 	0,
				limit: 		30,
			};

			var resp = lstb.dataStorage.getPortionData('/posts/', data);
			if(resp) {
				this.more = resp.more;
				this.add(resp.data);
				this.success(this, resp.data);
			} else {
				this.more = false;
				this.add([]);
				this.success(this, []);
			}
		}
	},

	success: function (collection, response, options) {
		response = _.toJSON(response);
		if(!response.error) {
			this.trigger("load:success");
		} else {
			lstb.error('PostItemCollection', response.error);
			this.trigger("load:error");
		}
	},

	error: function (collection, xhr, options) {
		lstb.error('PostItemCollection', 'request');
		this.trigger("load:error")
	}
});