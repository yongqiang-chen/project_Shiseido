require(["config"],function(){
	require(["jquery", "load", "loadnav", "cookie", "fly"],function($){
		//利用ajax来访问后端接口，获取数据
		$.ajax({
			type : "get",
			url : "/mock/test.json",
			dataType : "json",
			success : function(responseData){
				//处理数据，渲染
				responseData.res_body.list_pord.forEach(function(product){
					$(".list_template").clone()
										.removeClass("list_template").addClass("product")
										.css({display:"block"}).appendTo(".container")
										.find("img").attr("src", product.img)
										.parents(".p_img").next(".p_title")
										.text(product.title).next(".p_unit")
										.text(product.unit).next(".p_price").children("span")
										.text(product.price).parent(".p_price").siblings(".id")
										.text(product.id);
				});
			},
			error:function(err){
				console.log(err)
			}
		});

		//为“加入购物车”绑定点击事件：事件委派
		$(".container").on("click", ".add_cart", function(e){
			//获取当前点击的“加入购物车”所在大盒子
			var box = $(this).parent();
			
			//将当前选购商品信息保存到对象中
			var currentProduct = {
				id : box.children(".id").text(),
				price : box.children(".p_price").children("span").text(),
				title : box.children(".p_title").text(),
				unit : box.children(".p_unit").text(),
				img : box.children(".p_img").children("img").attr("src"),
				amount : 1
			};
			
			//配置cookie使用，自动json转换
			$.cookie.json = true;
			//先读取已有的购物车cookie
			var products = $.cookie("products") || [];
			//判断已有选购商品中是否当前商品被选购过
			var index = exist(currentProduct.id, products);
			if(index !== -1){
				products[index].amount++;
			}else{
				products.push(currentProduct);
			}
			//使用cookie保存购物车数据
			$.cookie("products", products, {expires:7, path:"/"});

			//添加抛物线效果
			var flyer = $(`<img src="${currentProduct.img}" style="width:40px;">`),
				position = $(".cart").position();
			flyer.fly({
				start : {
					left : e.clientX,
					top : e.clientY
				},
				end : {
					left : position.left + window.innerWidth,
					top : position.top,
					width : 0,
					height : 0
				}
			});
			//修改右上角已选购商品件数
			var num = $(".op-cart-number").text();
			num++;
			$(".op-cart-number").text(num);
		});

		//判断某ID商品是否已经选购过
		function exist(id, products){
			for(var i = 0, len = products.length; i < len; i++){
				if (products[i].id == id) {
					return i;
				}
			}
			return -1;
		}
	});	
});