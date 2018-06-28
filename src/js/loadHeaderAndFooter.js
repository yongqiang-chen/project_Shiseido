define(["jquery", "cookie"], function(){
	$(".header").load("/html/include/header.html", function(){
		// 判断用户是否登录
		$.cookie.json = true;
		let user = $.cookie("username");
		if(user){
			$(".small-signin").html(`
				<a href="#">欢迎您：${user}</a> / 
				<a href="#" class="close">退出</a>
			`);
		}

		$(".close").on("click", function(){
			$.cookie("username", null, {expires:-1, path:"/"});
			window.location.reload();
		});

		//判断是否有商品加入购物车
		let _products = $.cookie("products") || [];
		var number = 0;
		for(var i = 0, len = _products.length; i < len; i++){	
			number += _products[i].amount;
		}
		$(".op-cart-number").text(number);
	});
	$(".footer").load("/html/include/footer.html");
});