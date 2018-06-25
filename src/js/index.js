require(["config"],function(){
	require(["jquery", "load", "loadnav", "carousel"],function(){
		
		// 首页轮播图
		$(".banner").carousel({
			duration: 2000,
			imgs: [
				{href: "#", src: "images/banner01.jpg"},
				{href: "#", src: "images/banner02.jpg"},
				{href: "#", src: "images/banner03.jpg"},
				{href: "#", src: "images/banner04.jpg"},
				{href: "#", src: "images/banner05.jpg"},
				{href: "#", src: "images/banner06.png"}
			],
			width: 1000,
			height: 485,
			showBtn: true
		});

		//首页热销商品box1
		$.ajax({
			type : "get",
			url : "mock/test.json",
			dataType : "json",
			success : function(responseData){	
				responseData.res_body.list.forEach(function(product){
					$(".template_box1").clone()
										.removeClass("template_box1").css({display:"block"})
										.appendTo(".hotprod_box1").find("img").attr("src", product.img)
										.parents("p").next(".prod_title").children("a").text(product.title);
				});
			},
			error:function(err){
				console.log(err)
			}
		});
	});	
});

