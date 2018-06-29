require(["config"],function(){
	require(["jquery", "load", "loadnav", "cookie"],function($){
		$.cookie.json = true;
		//cookie方式进行登录验证 获取cookie保存的注册用户
		// var users = $.cookie("users");
		// console.log(users);
		// var _phone,_password;

		$("#phone").on("focus", function(){
			$(".phone").text("");
		});
		$("#phone").on("blur", function(){
			_phone = this.value;
			if(!_phone){
				$(".phone").text("请输入账号");
			}
			else{
				$(".phone").text("");
			}
		});

		$("#password").on("focus", function(){
			$(".password").text("");
		});
		$("#password").on("blur", function(){
			_password = this.value;
			if(!_password){
				$(".password").text("请输入密码");
			}
			else{
				$(".password").text("");
			}
		});

		$(".submit").on("click", function(){
			//cookie方式进行登录验证
			// var _user = lookup(_phone, users);
			// console.log(_user);
			// if(_user == -1 || _password != users[_user].password){
			// 	alert("账号或密码错误");
			// }
			// else{
			// 	alert("登录成功");
			// 	$.cookie("username", _phone, {path:"/"});
			// 	$(location).attr("href","/index.html");
			// }
			//php方式进行登录验证
			$.post("http://localhost/Shiseido/src/php/login.php", $(".login_old").serialize(), function(data){
				if(data.res_code === 1){
					alert("登录成功");
					$.cookie("username", _phone, {path:"/"});
					$(location).attr("href","/index.html");
				}else{
					$(".error").text("用户登录失败" + data.res_message);
				}
			}, "json");
		});
		
		//cookie登录要用的方法
		// function lookup(_phone, users){
		// 	for(var a in users){
		// 		if(users[a].username == _phone){
		// 			return a;
		// 		}
		// 	}
		// 	return -1;
		// }
	});	
});

