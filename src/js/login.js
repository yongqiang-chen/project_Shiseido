require(["config"],function(){
	require(["jquery", "load", "loadnav", "cookie"],function($){
		$.cookie.json = true;
		var users = $.cookie("users");
		console.log(users);
		var _phone,_password;

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
			var _user = lookup(_phone, users);
			console.log(_user);
			if(_user == -1 || _password != users[_user].password){
				alert("账号或密码错误");
			}
			else{
				alert("登录成功");
				$.cookie("username", _phone, {path:"/"});
				$(location).attr("href","/index.html");
			}
		});
		function lookup(_phone, users){
			for(var a in users){
				if(users[a].username == _phone){
					return a;
				}
			}
			return -1;
		}
	});	
});

