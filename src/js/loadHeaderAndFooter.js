define(["jquery", "cookie"], function(){
	$(".header").load("/html/include/header.html", function(){
		$.cookie.json = true;
		let user = $.cookie("username");
		if(user){
			$(".small-signin").html(`
				<a href="#">欢迎您：${user}</a> / 
				<a href="#" class="close">退出</a>
			`);
		}

		$(".close").on("click", function(){
			$.cookie("username", null);
			window.location.reload();
		});
	});
	$(".footer").load("/html/include/footer.html");
});