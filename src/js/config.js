require.config({
	baseUrl : "/",
	paths : {//短名称
		jquery : "/lib/jquery/jquery-1.12.4.min",
		artTemplate : "/lib/artTemplate/template-web",
		load : "/js/loadHeaderAndFooter",
		loadnav : "/js/loadNav",
		carousel : "/lib/jquery-plugins/jquery.xm_carousel",
		cookie : "/lib/jquery-plugins/jquery.cookie",
		fly : "/lib/jquery-plugins/jquery.fly.min",
		fdj : "/lib/jquery-plugins/jquery.elevateZoom-3.0.8.min"
	},
	shim:{
		carousel :{
			deps:["jquery"]
		},
		fly : {
			deps:["jquery"]
		},
		fdj : {
			deps:["jquery"]
		}
	}
});