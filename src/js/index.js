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

		//首页热销商品
		$.ajax({
			type : "get",
			url : "mock/test.json",
			dataType : "json",
			success : function(responseData){
				// hotprod_box1	
				responseData.res_body.list.forEach(function(product){
					$(".template_box1").clone()
										.removeClass("template_box1").css({display:"block"})
										.appendTo(".hotprod_box1").find("img").attr("src", product.img)
										.parents("p").next(".prod_title").children("a").text(product.title);
				});
				// hotprod_box2	
				responseData.res_body.hotgoods.forEach(function(product){
					$(".template_box2").clone()
										.removeClass("template_box2").addClass("hot_pro")
										.css({display:"block"}).appendTo(".hotprod_box2")
										.find("img").attr("src", product.img)
										.parents(".hot_pro_img").next(".hot_pro_title")
										.children("a").text(product.title)
										.parents(".hot_pro_title").next(".hot_pro_unit")
										.text(product.unit).next(".hot_pro_price")
										.text(product.price);
				});
			},
			error:function(err){
				console.log(err)
			}
		});
	});	
});

