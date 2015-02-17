lstb.PostItemListView = Backbone.View.extend({
	tagName: "div",
	className: "postitem-list-grid",
	template: "blocks/postitem-list",

	events: {
		// 'click .postitem-list-add>button': 'clickAdd'
	},

	initialize: function(options){
		this.collection = options.collection;
		this.collection.on("add", this.addPost, this);
		this.collection.on("load:start", 	this.showStartLoad, this);
		this.collection.on("load:success", 	this.hideStartLoad, this);
		this.collection.on("load:error", 	this.hideStartLoad, this);

		this.model = options.model;

		this.render();

		this.model.on('change:addpost', this.toggleAddPhoto, this);
		this.showStartLoad();
	},

	render: function(){
		var template = lstb.Templates.get(this.template);
		this.$el.html(template(this.model.toJSON()));
		this.$cont = 	this.$el.find(".postitem-list__container");
		this.$spinner = this.$el.find(".postitem-list__spinner");
		this.$addpost_cont =this.$el.find(".postitem-list-add");
		this.$addpost =this.$addpost_cont.find("button");
	},

	addPost: function (model, collection, options) {
		if(options && options.at === 0) {
			this.$addpost_cont.after(model.view.$el);
		} else {
			this.$cont.append(model.view.$el);
		}
	},

	showStartLoad: function () {
		if(!this.collection.length) {
			this.$el.toggleClass("postitem-list_new-load", true);
		}
		if(this.$spinner && this.collection.more) {
			this.$spinner.toggleClass("hidden", false);
		}

		this.delegateEvents();
	},

	hideStartLoad: function () {
		this.$el.toggleClass("postitem-list_new-load", false);
		if(!this.collection.length) {
			this.$el.toggleClass("postitem-list_empty", true);
		} else {
			this.$el.toggleClass("postitem-list_empty", false);
		}

		if(this.$spinner && !this.collection.more) {
		 	this.$spinner.toggleClass("hidden", true);
		}
	},	
});