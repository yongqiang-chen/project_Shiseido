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
		calcTotalPrice();

		//点击删除事件
		$("#cart_main").on("click", ".del", function(){
			var row = $(this).parents("tr"),
				_id = row.data("id");
			var num = $(".op-cart-number").text();
			var index = exist(_id,_products);
			_products.splice(index, 1);
			$.cookie("products", _products, {expires:7, path:"/"});
			row.remove();
			num = num - Number(row.find(".amount").val());
			$(".op-cart-number").text(num);

			calcTotalPrice();
		});

		//修改数量：+/-
		$("#cart_main").on("click", ".minus,.add", function(){
			var row = $(this).parents("tr"),
				_id = row.data("id");
			var index = exist(_id,_products);
			var prod = _products[index];
			var num = $(".op-cart-number").text();//右上角购物车商品件数
			if($(this).is(".add")){
				prod.amount++;
				num++;
				$(".op-cart-number").text(num);
			}
			else{
				if(prod.amount <= 1){
					return;
				}else{
					prod.amount--;
					num--;
					$(".op-cart-number").text(num);
				}
			}
			$.cookie("products", _products, {expires:7, path:"/"});
			row.find(".amount").val(prod.amount);
			row.find(".sub").text((prod.price * prod.amount).toFixed(2));

			calcTotalPrice();
		});

		//修改数量：修改
		$("#cart_main").on("blur", ".amount", function(){
			var row = $(this).parents("tr"),
				_id = row.data("id");
			var index = exist(_id,_products);
			var prod = _products[index];
			var inputtext = Number($(this).val());
			if(!/^[1-9]\d*$/.test(inputtext)){
				$(this).val(prod.amount);
				return;
			}
			prod.amount = inputtext;
			//保存到cookie
			$.cookie("products", _products, {expires:7, path:"/"});
			//修改小计
			row.find(".sub").text((prod.price * prod.amount).toFixed(2));
			var _num = 0;
			$(".prod_tr").each(function(index, element){
				_num += Number($(this).find(".amount").val());
			});
			$(".op-cart-number").text(_num);

			calcTotalPrice();
		});


		//点击去结算事件
		$("#cart_submit").click(function(){
			if($.cookie("username")){
				$(location).attr("href","/html/confirm.html");
			}else{
				$(location).attr("href","/html/login.html");
			}
		});

		function exist(id, products){
			for(var i = 0; i < products.length; i++){
				if(products[i].id == id){
					return i;
				}
			}
			return -1;
		}

		function calcTotalPrice(){
			var total = 0;
			$(".prod_tr").each(function(index, element){
				total += Number($(this).find(".sub").text());
			});
			$("#total-price").text(total);
		}
	});	
});

