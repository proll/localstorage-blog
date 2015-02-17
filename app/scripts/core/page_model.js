lstb.Page = Backbone.Model.extend({
	initialize: function(options){
		this.view = new lstb.PageView({
			model: this,
			template: options.template
		});
		this.view.on("render", function(){
			this.collection.trigger("render");
		});

		if(this.get("view")){
			if(this.get("model")){
				this.pageView = new lstb[this.get("view")]({
					model: this.get("model")
				});
			}else{
				this.pageView = new lstb[this.get("view")];
			}
		}
		if(this.get("model")){
			this.pageModel = new lstb[this.get("model")];
		}
	},

	render: function(){
		if(this.view && this.view.render)
			this.view.render();
	},
	remove: function(){
		this.view.remove();
	},
	enterDocument : function(){

	}
});