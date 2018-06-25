require.config({
	baseUrl : "/",
	paths : {//短名称
		jquery : "/lib/jquery/jquery-1.12.4.min",
		load : "/js/loadHeaderAndFooter",
		loadnav : "/js/loadNav",
		carousel : "/lib/jquery-plugins/jquery.xm_carousel"
	},
	shim:{
		carousel :{
			deps:["jquery"]
		}
	}
});