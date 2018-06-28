require(["config"],function(){
	require(["jquery", "load", "loadnav", "cookie"],function($){
		$(function(){
			var _phone, _password;
			$("#phone").on("focus", function(){
				$(".phone").text(" ");
			});
			$("#phone").on("blur", function(){
				_phone = this.value;
				var reg=/^[1][3,4,5,7,8]\d{9}$/;
				if(!reg.test(_phone)){
					$(".phone").text("请输入正确的手机号码");
				}
				else{
					$(".phone").text("");
				}
			});
			$("#password").on("focus", function(){
				$(".ps-one").text(" ");
			});
			$("#password").on("blur", function(){
				_password = this.value;
				if(!_password){
					$(".ps-one").text("请输入密码");
				}
				else{
					$(".ps-one").text("");
				}
			});
			$("#password2").on("focus", function(){
				$(".ps-two").text(" ");
			});
			$("#password2").on("blur", function(){
				var _password2 = this.value;
				if(_password != _password2){
					$(".ps-two").text("密码不一致，请重新输入");
				}
				else{
					$(".ps-two").text("");
				}
			});
			$("#apply").on("click", function(){
				/*cookie方式注册*/
				// $.cookie.json = true;
				// var users = $.cookie("users")|| [];
				// if(_phone && _password){
				// 	console.log(users);
				// 	var current = {
				// 		username:_phone,
				// 		password:_password
				// 	};
				// 	for(var k = 0;k < users.length;k++){
				// 		if(_phone == users[k].username){
				// 			alert("该用户已注册");
				// 			return;
				// 		}
				// 	}
				// 	alert("注册成功");
				// 	users.push(current);
				// 	$.cookie("users",users,{expires:7,path:"/"});
				// 	$(location).attr("href","/html/login.html");
				// }else{
				// 	alert("请重新输入你的电话和密码");
				// }

				/*数据库方式*/
				$.post("http://localhost/");
			});
		});
	});	
});

