this.lstb=this.lstb||{},this.lstb.Templates=this.lstb.Templates||{},this.lstb.Templates.ptemplates=this.lstb.Templates.ptemplates||{},this.lstb.Templates.ptemplates["blocks/post"]=Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e="";return e+='\n    <a class="btn post__save" href="/post/',(d=c.key)?d=d.call(a,{hash:{},data:b}):(d=a.key,d=typeof d===k?d.apply(a):d),e+=l(d)+'/">Save</a>\n'}function g(a,b){var d,e="";return e+='\n    <a class="btn" href="/post/',(d=c.key)?d=d.call(a,{hash:{},data:b}):(d=a.key,d=typeof d===k?d.apply(a):d),e+=l(d)+'/edit">Edit</a>\n'}function h(){return' disabled="disabled"'}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var i,j="",k="function",l=this.escapeExpression,m=this;return j+='<div class="post__header">\n    <a href="/" class="post__back">../back</a>\n',i=c["if"].call(b,b.can_edit,{hash:{},inverse:m.program(3,g,e),fn:m.program(1,f,e),data:e}),(i||0===i)&&(j+=i),j+='\n</div>\n<form action="" class="post__form">\n    <input type="text" class="post__title"',i=c.unless.call(b,b.can_edit,{hash:{},inverse:m.noop,fn:m.program(5,h,e),data:e}),(i||0===i)&&(j+=i),j+=' value="',(i=c.title)?i=i.call(b,{hash:{},data:e}):(i=b.title,i=typeof i===k?i.apply(b):i),j+=l(i)+'">\n    <textarea class="post__content"',i=c.unless.call(b,b.can_edit,{hash:{},inverse:m.noop,fn:m.program(5,h,e),data:e}),(i||0===i)&&(j+=i),j+=">",(i=c.content)?i=i.call(b,{hash:{},data:e}):(i=b.content,i=typeof i===k?i.apply(b):i),j+=l(i)+"</textarea>\n</form>"}),this.lstb.Templates.ptemplates["blocks/postitem-list"]=Handlebars.template(function(a,b,c,d,e){return this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{},'<div class="postitem-list__container">\n	<div class="postitem-list-add">\n		<a class="btn" href="/post/0/add/">Add post</a>\n	</div>\n</div>\n<div class="postitem-list__nopost-title">No posts at all, try to add one</div>\n<div class="postitem-list__spinner"></div>'}),this.lstb.Templates.ptemplates["blocks/postitem"]=Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var f,g="",h="function",i=this.escapeExpression;return g+='<h2><a href="/post/',(f=c.key)?f=f.call(b,{hash:{},data:e}):(f=b.key,f=typeof f===h?f.apply(b):f),g+=i(f)+'/">',(f=c.title)?f=f.call(b,{hash:{},data:e}):(f=b.title,f=typeof f===h?f.apply(b):f),g+=i(f)+"</a></h2>\n<p>",(f=c.content)?f=f.call(b,{hash:{},data:e}):(f=b.content,f=typeof f===h?f.apply(b):f),g+=i(f)+"</p>"}),this.lstb.Templates.ptemplates["pages/403-page"]=Handlebars.template(function(a,b,c,d,e){return this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{},'<p class="error-page__description">Sorry, can’t let you get any further than this.</p>'}),this.lstb.Templates.ptemplates["pages/404-page"]=Handlebars.template(function(a,b,c,d,e){return this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{},'<p class="error-page__description">Make sure that URL entered correctly.</p>'}),this.lstb.Templates.ptemplates["pages/explore-page"]=Handlebars.template(function(a,b,c,d,e){return this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{},'<div class="row">\n	<div class="postitem-list-col"></div>\n</div>'}),this.lstb.Templates.ptemplates["pages/post-page"]=Handlebars.template(function(a,b,c,d,e){return this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{},'<div class="post-page-row"></div>'}),"undefined"==typeof console&&(window.console={log:function(){},error:function(){}}),window.lstb=window.lstb||{},window.lstb=_.extend(window.lstb,{fbapp:1==_.getURLParameter("fbapp")||1==_.getURLParameter("fb_appcenter"),maindomain:"weheartpics.com",domain:window.location.protocol+"//"+window.location.host,language:_.getLangFromDomain(window.location.host)||_.getCookie("lang")||(navigator.language||navigator.systemLanguage||navigator.browserLanguage||navigator.userLanguage||"en").substr(0,2).toLowerCase(),available_languages:["en","ru","ko","ja","zh","es","pt"],l10n:{},preloadTemplates:function(){if(window.whp_dev){var a=[];return _.each(window.templates.files,function(b){var c=window.templates.path+"/"+b+"."+window.templates.ext;a.push($.get(c,function(a){lstb.Templates.add(b,a)}))}),a}return[]},init:function(){var a=0,b=this;_.forEach(this.available_languages,function(c){b.language!==c&&a++}),a===this.available_languages.length&&(this.language="en"),_.setCookie("lang",this.language),$.when.apply(this,this.preloadTemplates()).done(function(){lstb.app=new lstb.App({debug:!0}),Backbone.history.start({pushState:!0})}),$(document).on("click","a",function(a){if(a.metaKey||a.ctrlKey)return!0;var b=$(this);return b.attr("target")?!0:(a.stopPropagation(),a.preventDefault(),"event"==b.attr("type")?lstb.trigger(b.attr("href")):(lstb.app.router.context=b.data(),lstb.app.router.navigate(b.attr("href"),{trigger:!0})),!1)})},log:function(a){console.log(a)},error:function(a,b){console.error(a,b),lstb.app&&lstb.app.statistic&&("object"==typeof b?b.code?lstb.app.statistic.trackError(a,b.code+":"+b.info):lstb.app.statistic.trackError(a,"unknown:response:structure"):lstb.app.statistic.trackError(a,b))},navigate:function(a,b){b&&b.trigger===!1&&(lstb.app.statistic.trackCurrentPageChange(),lstb.app.trigger("need:meta:update")),lstb.app.router.navigate(a,b)},speedScrollTop:function(a,b){$("html, body").animate({scrollTop:a||0},b||300)}}),window.lstb.Templates=window.lstb.Templates||{},window.lstb.Templates=_.extend(window.lstb.Templates,{templates:{},compiled:{},add:function(a,b){this.templates[a]=b},get:function(a){if(window.lstb_dev)return this.compiled[a]?this.templates[a]:this.templates[a]?(this.templates[a]=Handlebars.compile(this.templates[a]),this.compiled[a]=!0,this.templates[a]):(console.error("Can't find template \""+a+'"'),function(){return""});if(this.ptemplates){var b=this.ptemplates[a];return b?b:(console.error("Can't find template \""+a+'"'),function(){return""})}return console.error("Can't find templates at all"),function(){return""}}}),$(document).ready(function(){_.extend(lstb,Backbone.Events),lstb.init()}),lstb.DataStorage=Backbone.Model.extend({defaults:{},initialize:function(a){a=a||{}},getPortionData:function(a,b){var c=this,d=_.toJSON(localStorage.getItem(a)),e=d?d.length:0;return d&&e?b.offset<e?(d=d.slice(b.offset,b.offset+b.limit),{more:b.offset+b.limit<e,data:_.map(d,function(a){return _.extend(c.getData(a),{key:a})})}):{more:!1,data:[]}:!1},getData:function(a){return _.toJSON(localStorage.getItem(a))},setData:function(a,b){return localStorage.setItem(a,_.toJSONString(b))}}),lstb.Page=Backbone.Model.extend({initialize:function(a){this.view=new lstb.PageView({model:this,template:a.template}),this.view.on("render",function(){this.collection.trigger("render")}),this.get("view")&&(this.pageView=this.get("model")?new(lstb[this.get("view")])({model:this.get("model")}):new(lstb[this.get("view")])),this.get("model")&&(this.pageModel=new(lstb[this.get("model")]))},render:function(){this.view&&this.view.render&&this.view.render()},remove:function(){this.view.remove()},enterDocument:function(){}}),lstb.PageView=Backbone.View.extend({el:"#lstb-container",template:"",renderedHtml:null,initialize:function(a){return a&&a.template?(this.template=lstb.Templates.get(a.template),void this.createDom()):void lstb.error("PageView","Page must have a template")},createDom:function(){},render:function(){if(this.renderedHtml)this.$el.append(this.renderedHtml);else{var a=$("<div></div>").addClass("page-"+this.model.get("name")).html(this.template(this.model.toJSON()));this.trigger("page:preRender",a),this.$el.html(a)}$("body").attr("class","body__page-"+this.model.get("name")),this.model.enterDocument(),this.trigger("page:render",this.model),this.trigger("enterDocument",this.model)},remove:function(){console.log("page remove"),this.renderedHtml=this.$el.find(".page-"+this.model.get("name")).detach()}}),lstb.PagesCollection=Backbone.Collection.extend({initialize:function(){},getPage:function(a){var b=this.find(function(b){return b.get("name")==a});return b||this.first()},havePage:function(a){return this.any(function(b){return b.get("name")==a})}}),lstb.Statistic=Backbone.Model.extend({active:!0,initialize:function(){this.active=!_.browser.phantom},trackCurrentPageChange:function(){return this.active?(this.trackPageChange(window.location.pathname),!0):!1},trackPageChange:function(a){if(!this.active)return!1;var b=a.toString();"/"!=b.charAt(0)&&(b="/"+b),ga("send","pageview",b)},trackError:function(a,b){return this.active?void ga("send","event","Error",a,b):!1}}),lstb.App=Backbone.Model.extend({_didScroll:!1,initialize:function(){var a=this,b=window.lstb;this.dataStorage=new b.DataStorage,b.dataStorage=this.dataStorage,this.statistic=new b.Statistic,this.router=new b.Router,this.pages=new b.PagesCollection,this.pages.add(new b.Page({name:"404",template:"pages/404-page"})),this.pages.add(new b.Page({name:"403",template:"pages/403-page"})),this.explore=new b.ExplorePage({name:"explore",template:"pages/explore-page"}),this.pages.add(this.explore),this.post=new b.PostPage({name:"photo",template:"pages/post-page"}),this.pages.add(this.post),this.router.on("404",function(){a.pages.getPage("404").render()}),this.router.on("route",function(a,c,d){switch(console.log("route:"+a),this.router.route_passed>1&&this.statistic.trackCurrentPageChange(),b.trigger("route",a,c,d),a){case"explore":this.explore.render();break;case"post":this.post.render({key:c[0],action:c[1]});break;default:c[0]&&!this.router.previousWasPopup()}this.trigger("need:meta:update")},this),this.router.on("reset",function(a,c){if(console.log(a,c),!this.router.isPopup(c))switch(this.router.isPopup(a)||b.speedScrollTop(0,1),a){case"explore":console.log("reset:explore"),this.explore.sleep();break;case"post":console.log("reset:explore"),this.explore.sleep()}this.router.isPopup(a)&&_.forEach(this.pages.models,function(a){a.sleep&&a.get("name")!=c&&a.sleep()})},this),b.on("historyback",function(){b.app.router.previousWasPopup()?b.navigate("/photofeed",{trigger:!0}):b.navigate(this.router.back_path,{trigger:!0})},this),b.on("historyback:reload",function(){b.trigger("historyback"),window.location.reload()},this);var c=$(window),d=$(document);$(window).scroll(function(){var a=c.scrollTop(),e=d.height(),f=c.height();b.trigger("scroll",{s_top:a,d_h:e,w_h:f}),a+150>=e-f&&b.trigger("pagebottom:reached")}),b.trigger("app:init")}}),lstb.Router=Backbone.Router.extend({_previous_route:"",previous_route:"",previous_page_route:"",current_route:"",_back_path:"",back_path:"",route_passed:0,context:{},routes:{"":"explore","/":"explore",".":"explore","post/:id":"post","post/:id/":"post","post/:id/:action":"post","post/:id/:action/":"post",404:"er404",403:"er403","*default":"er404"},popoup_routes:[],logout:function(){this.navigate("/"),window.location.reload()},er404:function(){return console.log("no such route ",arguments),this.trigger("404",arguments),!1},er403:function(){return console.log("access dinied route ",arguments),this.trigger("403",arguments),!1},initialize:function(){var a=_.uniq(_.values(this.routes));_(a).each(function(a){this.on("route:"+a,function(){this.route_passed++,this._previous_route&&this._previous_route!=a?(this.trigger("reset",this._previous_route,a,this._back_path),this.trigger("reset:"+this._previous_route)):this.current_route=a,this._previous_route=a,this._back_path=Backbone.history.fragment},this)},this),this.on("reset",function(a,b,c){this.back_path=c,this.current_route=b,this.previous_route=a,this.isPopup(this.previous_route)||(this.previous_page_route=this.previous_route)})},previousWasPopup:function(){return this.isPopup(this.previous_route)},currentIsPopup:function(){return this.route_passed>1&&this.isPopup(this.current_route)},isPopup:function(a){return-1!==_.indexOf(this.popoup_routes,a)}}),lstb.ExplorePage=lstb.Page.extend({visited:!1,defaults:{sleeped:!0},initialize:function(a){a=a||{}},needRerender:function(){return this.get("sleeped")},render:function(a){return this.needRerender(a)?void(this.visited?(this.set(a),this.view.render(),this.list.activate(),this.view.addList(this.list),this.list.reset(),this.set("sleeped",!1)):(this.visited=!0,this.view=new lstb.ExplorePageView({model:this,template:"pages/explore-page"}),this.list=new lstb.PostItemList,this.view.render(),this.list.activate(),this.view.addList(this.list),this.set("sleeped",!1))):!1},sleep:function(){return this.get("sleeped")?!1:(this.set("sleeped",!0),void this.list.sleep())}}),lstb.ExplorePageView=lstb.PageView.extend({addList:function(a){this.$el.find(".postitem-list-col").html(a.view.$el)}}),lstb.PostItem=Backbone.Model.extend({defaults:{title:"",content:"",key:0},initialize:function(){this.view=new lstb.PostItemView({model:this})},fetch:function(){this.view.render()},remove:function(){this.stopListening(),this.clear({silent:!0}),this.view.remove()}}),lstb.PostItemView=Backbone.View.extend({template:"blocks/postitem",tagName:"div",className:"postitem",initialize:function(){this.template=lstb.Templates.get(this.template)},render:function(){var a=this.template(this.model.toJSON());this.$el.html(a)}}),lstb.PostItemCollection=Backbone.Collection.extend({model:lstb.PostItem,more:!0,total:0,xhr:null,parse:function(a){return a=_.toJSON(a),console.log(a),a.photos?(this.more=a.photos.more,this.total=a.photos.total,a.photos.list?a.photos.list:!1):void 0},fetch:function(a){if(this.more){var b=a.data||{offset:0,limit:30},c=lstb.dataStorage.getPortionData("/posts/",b);c?(this.more=c.more,this.add(c.data),this.success(this,c.data)):(this.more=!1,this.add([]),this.success(this,[]))}},success:function(a,b){b=_.toJSON(b),b.error?(lstb.error("PostItemCollection",b.error),this.trigger("load:error")):this.trigger("load:success")},error:function(){lstb.error("PostItemCollection","request"),this.trigger("load:error")}}),lstb.PostItemList=Backbone.Model.extend({collection:null,defaults:{offset:0,limit:10,loading:!1,sleeped:!0,scrollload:!0,url:"/posts/"},initialize:function(){(_.isPhone()||_.isPhone2())&&this.set("addphoto",!1),this.collection=new lstb.PostItemCollection,this.collection.url=this.get("url"),this.collection.on("load:success",function(){this.set("offset",this.get("offset")+this.get("limit")),this.set("loading",!1)},this).on("load:error",function(){console.error("postitem_list:load:error"),this.set("loading",!1)},this).on("load:start",function(){this.set("loading",!0)},this).on("add",this.addPost,this).on("reset",this.resetPosts,this),this.view=new lstb.PostItemListView({collection:this.collection,model:this}),this.on("needmore",this.needMore,this),this.get("scrollload")&&lstb.on("pagebottom:reached context:needmore",function(){this.trigger("needmore")},this)},addPost:function(a){a.fetch()},resetPosts:function(a,b){_.each(b.previousModels,function(a){a.remove()}),this.collection.more=!0},needMore:function(){if(!this.get("loading")&&!this.get("sleeped")){var a=_.extend({offset:this.get("offset"),limit:this.get("limit")});this.collection.fetch({data:a})}},reset:function(){return this.collection.reset(),this.set("offset",this.defaults.offset),this.collection.reset(),this.trigger("needmore"),!1},reload:function(){this.reset(),this.trigger("needmore")},activate:function(){this.collection.reset(),this.set("offset",this.defaults.offset),this.set("sleeped",!1),this.trigger("needmore"),this.hSfunc=_.bind(this.handleStorage,this),window.addEventListener?window.addEventListener("storage",this.hSfunc,!1):window.attachEvent("onstorage",this.hSfunc)},handleStorage:function(a){a||(a=window.event),console.log(a);var b=[];a.key&&this.collection.length&&(b=this.collection.where({key:parseInt(a.key)}),b.length?_.forEach(b,function(b){b.set(_.toJSON(a.newValue)),b.fetch()}):(b=lstb.dataStorage.getData("/posts/"),b&&b.length||(b=[]),a.oldValue||this.collection.unshift(_.toJSON(a.newValue))))},sleep:function(){this.set("sleeped",!0),window.removeEventListener?window.removeEventListener("storage",this.hSfunc):window.detachEvent("onstorage",this.hSfunc)}}),lstb.PostItemListView=Backbone.View.extend({tagName:"div",className:"postitem-list-grid",template:"blocks/postitem-list",events:{},initialize:function(a){this.collection=a.collection,this.collection.on("add",this.addPost,this),this.collection.on("load:start",this.showStartLoad,this),this.collection.on("load:success",this.hideStartLoad,this),this.collection.on("load:error",this.hideStartLoad,this),this.model=a.model,this.render(),this.model.on("change:addpost",this.toggleAddPhoto,this),this.showStartLoad()},render:function(){var a=lstb.Templates.get(this.template);this.$el.html(a(this.model.toJSON())),this.$cont=this.$el.find(".postitem-list__container"),this.$spinner=this.$el.find(".postitem-list__spinner"),this.$addpost_cont=this.$el.find(".postitem-list-add"),this.$addpost=this.$addpost_cont.find("button")},addPost:function(a,b,c){c&&0===c.at?this.$addpost_cont.after(a.view.$el):this.$cont.append(a.view.$el)},showStartLoad:function(){this.collection.length||this.$el.toggleClass("postitem-list_new-load",!0),this.$spinner&&this.collection.more&&this.$spinner.toggleClass("hidden",!1),this.delegateEvents()},hideStartLoad:function(){this.$el.toggleClass("postitem-list_new-load",!1),this.collection.length?this.$el.toggleClass("postitem-list_empty",!1):this.$el.toggleClass("postitem-list_empty",!0),this.$spinner&&!this.collection.more&&this.$spinner.toggleClass("hidden",!0)}}),lstb.PostPage=lstb.Page.extend({visited:!1,defaults:{key:0,action:"view"},initialize:function(a){a=a||{}},render:function(a){this.set(a),this.visited=!0,"add"===this.get("action")&&this.set("key",Date.now()),this.view=new lstb.PostPageView({model:this,template:"pages/post-page"}),this.view.render(),this.post=new lstb.Post(this.toJSON()),this.view.addPost(this.post),this.post.activate(),this.post.on("save",this.recreate,this),this.hSfunc=_.bind(this.handleStorage,this),window.addEventListener?window.addEventListener("storage",this.hSfunc,!1):window.attachEvent("onstorage",this.hSfunc)},handleStorage:function(a){a||(a=window.event),a.key===this.get("key")&&(this.remove(),this.render())},recreate:function(){console.log("save"),lstb.navigate("/post/"+this.get("key")+"/",{trigger:!0})},successLoadContext:function(){this.set("loading",!1)},sleep:function(){this.remove()},remove:function(){this.off(),this.post&&(this.post.off(),this.post.remove()),this.view&&(this.view.off(),this.view.remove()),window.removeEventListener?window.removeEventListener("storage",this.hSfunc):window.detachEvent("onstorage",this.hSfunc)}}),lstb.PostPageView=lstb.PageView.extend({addPost:function(a){this.$el.find(".post-page-row").html(a.view.$el)},remove:function(){this.model.off(null,null,this),this.undelegateEvents()}}),lstb.Post=Backbone.Model.extend({url:"post",defaults:{key:0,action:"view",content:"",title:"",can_edit:!1},initialize:function(){this.view=new lstb.PostView({model:this}),this.on("load:success",this.init,this)},init:function(){this.trigger("post:ready")},fetch:function(){var a=lstb.dataStorage.getData(this.get("key"));a?this.success(this,a):this.error(this)},success:function(a,b){b=_.toJSON(b),this.set(b),b.error?(lstb.error("Post",b.error),this.trigger("load:error")):this.trigger("load:success")},error:function(){lstb.error("Post","request"),this.trigger("load:error")},reset:function(){return!1},save:function(a){this.set(a);var b=lstb.dataStorage.getData("/posts/"),c=this.get("key");b&&b.length||(b=[]),-1===_.indexOf(b,c)&&(b.unshift(c),lstb.dataStorage.setData("/posts/",b)),lstb.dataStorage.setData(c,{key:c,title:this.get("title"),content:this.get("content")}),this.trigger("save")},activate:function(){this.set("sleeped",!1),"edit"===this.get("action")?(this.set("can_edit",!0),this.fetch()):"add"===this.get("action")?(this.set("can_edit",!0),this.trigger("load:start"),this.trigger("load:success")):(this.set("can_edit",!1),this.fetch())},sleep:function(){this.set("sleeped",!0)},remove:function(){this.stopListening(),this.clear({silent:!0}),this.view.remove()}}),lstb.PostView=Backbone.View.extend({template:"blocks/post",tagName:"div",className:"post-row",events:{"click .post__save":"save","keypress :input":"hideErrors","submit .post__form":"submit"},initialize:function(){this.template=lstb.Templates.get(this.template),this.model.on("load:success",this.render,this),this.model.on("change:sleeped",this.sleep,this)},render:function(){var a=this.template(this.model.toJSON());this.$el.append(a),this.$inputs=this.$el.find(":input"),this.$title=this.$el.find(".post__title"),this.$content=this.$el.find(".post__content"),this.delegateEvents()},save:function(a){a&&a.preventDefault&&a.preventDefault(),this.hideErrors();var b=$.trim(this.$title.val()),c=$.trim(this.$content.val());return b?c?(this.model.save({title:b,content:c}),!1):(this.showError(this.$content),!1):(this.showError(this.$title),!1)},submit:function(a){return a&&a.preventDefault&&a.preventDefault(),this.save(),!1},hideErrors:function(){this.$inputs.toggleClass("input_error",!1)},showError:function(a){a.focus(),a.toggleClass("input_error",!0)},sleep:function(a,b){b&&this.remove()},remove:function(){this.undelegateEvents()}});