require(["config"],function(){
	require(["jquery", "artTemplate", "load", "loadnav", "cookie", "fdj"],function($,template,l,n,c,elevateZoom){
		//加载数据和渲染
			$.cookie.json = true;
			var _product = $.cookie("product") || [];
			var _products = $.cookie("products") || [];
			if(_product.length == 0){
				return;
			}
			var html = template("detail_template", {product: _product});
			$(".container").html(html);

		//放大镜
		//$(".fdj_img").elevateZoom({tint:true, tintColour:'#F90', tintOpacity:0.5});

		//修改数量：+/-
		$(".container").on("click", ".minus,.add", function(){
			var _box = $(this).parents(".content"),
				_id = _box.data("id");
			//当前商品的操作
			var index = exist(_id,_product);
			var prod = _product[index];
			if($(this).is(".add")){
				prod.amount++;
			}else{
				if(prod.amount <= 1){
					return;
				}else{
					prod.amount--;
				}
			}
			$.cookie("product",_product, {expires:7, path:"/"});
			_box.find(".amount").val(prod.amount);
			_box.find(".price").text((prod.price * prod.amount).toFixed(2));
		});

		//修改数量：输入修改
		$(".container").on("blur", ".amount", function(){
			var _box = $(this).parents(".content"),
				_id = _box.data("id");
			var index = exist(_id,_product);
			var prod = _product[index];
			var inputtext = Number($(this).val());
			if(!/^[1-9]\d*$/.test(inputtext)){
				$(this).val(prod.amount);
				return;
			}
			prod.amount = inputtext;
			$.cookie("product", _product, {expires:7, path:"/"});
			_box.find(".price").text((prod.price * prod.amount).toFixed(2));
		});

		//点击加入购物车
		$(".container").on("click", ".add_cart", function(){
			var _box = $(this).parents(".content"),
				_id = _box.data("id");
			var index = exist(_id, _product);
			var index_two = exist(_id, _products);
			if(index_two == -1){
				var array = _products.concat(_product);
				_products = array;
				$.cookie("products", _products, {expires:7, path:"/"});
			}else{
				var _amount = _products[index_two].amount + _product[index].amount;
				_products[index_two].amount = _amount;
				$.cookie("products", _products, {expires:7, path:"/"});
			}
			location = "/html/cart.html"
		});

		function exist(id, products){
			for(var i = 0; i < products.length; i++){
				if(products[i].id == id){
					return i;
				}
			}
			return -1;
		}
	});	
});
