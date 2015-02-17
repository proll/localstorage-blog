lstb.Statistic = Backbone.Model.extend({
	active: true,


	initialize : function() {
		this.active = !_.browser.phantom;
	},

	trackCurrentPageChange : function(_url) {
		if(!this.active) return false;
		this.trackPageChange(window.location.pathname);
		return true;
	},

	trackPageChange : function(_url) {
		if(!this.active) return false;
		var str = (_url).toString();
		if (str.charAt(0)!="/") {
			str = "/"+str;
		}
		ga('send', 'pageview', str);
	},


	trackError : function(url, desc) {
		if(!this.active) return false;
		 ga('send', 'event', 'Error', url, desc);
	},

});