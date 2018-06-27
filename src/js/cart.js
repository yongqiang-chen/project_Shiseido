require(["config"],function(){
	require(["jquery", "artTemplate", "load", "cookie"],function($,template,l,c){
		// 加载数据和渲染
		$.cookie.json = true;
		var _products = $.cookie("products")||[];
		if(_products.length == 0){
			return;
		}
		var html = template("cart_template", {products: _products});
		$("#cart_main tbody").html(html);

	});	
});

