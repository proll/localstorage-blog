if (typeof console == "undefined") window.console = { log: function() {}, error: function() {}}; 
window.lstb = window.lstb || {};
window.lstb = _.extend(window.lstb, {
	fbapp: 			_.getURLParameter('fbapp') == 1 || _.getURLParameter('fb_appcenter') == 1,
	maindomain: 	'weheartpics.com',
	domain: 		window.location.protocol + '//' + window.location.host,
	language: 		_.getLangFromDomain(window.location.host) || _.getCookie('lang') || (navigator.language || navigator.systemLanguage || navigator.browserLanguage || navigator.userLanguage || 'en').substr(0, 2).toLowerCase(),
	available_languages: ['en', 'ru', 'ko', 'ja', 'zh', 'es', 'pt'],
	l10n: {},

	preloadTemplates: function(){
		if(!!window.whp_dev) {
			var files = [];
			_.each(window.templates.files, function(templateName){
				var file = window.templates.path + "/" + templateName + "." + window.templates.ext;
				files.push( $.get(file, function(templateData){
					lstb.Templates.add(templateName, templateData);
				}));
			});
			return files;
		} else {
			return [];
		}
	},
	init: function() {
		var lang_cnt = 0,
			that = this;
		_.forEach(this.available_languages, function(lang, i) {
			if (that.language !== lang) {
				lang_cnt++;
			}
		});

		if(lang_cnt === this.available_languages.length) {
			this.language = 'en';
		}

		_.setCookie('lang', this.language);

		$.when.apply(this, this.preloadTemplates())
			.done(function(){
				/**
				 * lstb app initialization
				 */
				lstb.app = new lstb.App({ 
					debug: true,
				});
				// Init Backbone history
				Backbone.history.start({pushState: true});

			});

		// Catch links and trigger router
		$(document).on("click", "a", function(e){
			if (e.metaKey || e.ctrlKey) return true;
			var $this = $(this);
			if($this.attr("target")) return true;
			
			e.stopPropagation();
			e.preventDefault();

			if($this.attr('type') == 'event') {
				lstb.trigger($this.attr('href'));
			} else {
				lstb.app.router.context = $this.data();
				lstb.app.router.navigate($this.attr("href"), {trigger: true});
			}
			return false;
		});
	},

	log: function (txt) {
		console.log(txt);
	},

	error: function(source, desc) {
		console.error(source, desc);
		if(!lstb.app || !lstb.app.statistic) return;
		if(typeof desc === 'object') {
			if(!!desc.code) {
				lstb.app.statistic.trackError(source, desc.code + ':' + desc.info);
			} else {
				lstb.app.statistic.trackError(source, 'unknown:response:structure');
			}
		} else {
			lstb.app.statistic.trackError(source, desc);
		}
	},

	navigate: function (path, options) {
		if(!!options && options.trigger === false) {
			lstb.app.statistic.trackCurrentPageChange();
			lstb.app.trigger('need:meta:update');
		}
		lstb.app.router.navigate(path, options);
	},

	speedScrollTop: function(s_t, time) {
		$("html, body").animate({ 
			scrollTop: s_t || 0 
		}, time || 300);
	},
});

window.lstb.Templates = window.lstb.Templates || {};
window.lstb.Templates =  _.extend(
	window.lstb.Templates,
	{
		templates: {},
		compiled: {},
		// ptemplates: {},
		add: function(name, template){
			this.templates[name] = template;
		},
		get: function(name){
			// if it is dev environment - compile on runtime
			if(!!window.lstb_dev) {			
				if(this.compiled[name]){
					return this.templates[name];
				}else if(this.templates[name]){
					this.templates[name] = Handlebars.compile(this.templates[name]);
					this.compiled[name] = true;
					return this.templates[name];
				}else{
					console.error("Can't find template \"" + name + "\"");
					return function(){ return "" }
				}
			} else {
			// if it is prod environment - get from precompiled
				if(this.ptemplates) {
					var ptemplate = this.ptemplates[name];
					if(ptemplate) {
						return ptemplate;
					} else {
						console.error("Can't find template \"" + name + "\"");
						return function() { return "" }
					}
				} else {
					console.error("Can't find templates at all");
					return function() { return "" }
				}
			}
		}
	}
);

$(document).ready(function(){
	_.extend(lstb, Backbone.Events);
	lstb.init();
	// $(document).on('keyup', function(e){console.log(e)})
});
