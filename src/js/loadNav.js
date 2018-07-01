define(["jquery"], function(){
	$(".header_nav").load("/html/include/nav.html",function(){
		$(".search :text").on("keyup", function(){
			//获取文本框输入内容
			const txt = $(this).val();
			//jsonp跨域接口
			const url = `https://suggest.taobao.com/sug?code=utf-8&q=${txt}&callback=?`;
			$.getJSON(url, function(data){
				let html = "";
				data.result.forEach(function(curr){
					html += `<div>${curr[0]}</div>`
				});
				$(".suggest").show().html(html);
			});
		});
		
		$(".search :text").on("blur", function(){
			$(".suggest").hide("slow");
		});
		
		$(".suggest").delegate("div", "click", function(){
		 	const txt = $(this).text();
		 	$(".search :text").val(txt);
		 	$(".suggest").hide();
		});
	});
});