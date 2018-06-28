<?php
	//跨域
	header(""Access-Control-Allow-Origin:*"");
	/* 注册 */
	$username = $_POST["username"];
	$password = $_POST["password"];

	//连接数据库
	mysql_connect("localhost:3306", "root", "");
	//编码
	mysql_query("set character set utf8");
	mysql_query("set names utf8");
	//选择数据库
	mysql_select_db("h51803");
	//定义sql语句
	$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
	//执行sql语句
	$result = mysql_query($sql);
	//判断
	// if($result){
	// 	$arr = array("res_code"=>1, "res_message"=>"success");
	// 	echo json_encode($arr);
	// }else{
	// 	$arr = array("res_code"=>0, "res_message"=>mysql_error());
	// 	echo json_encode($arr);
	// }
	// 判断
	if ($result) { // 保存成功
		$arr = array("res_code"=>1, "res_message"=>"注册成功");
		echo json_encode($arr);
	} else { // 失败
		$arr = array("res_code"=>0, "res_message"=>"注册失败" . mysql_error());
		echo json_encode($arr);
	}

	//关闭数据库
	mysql_close();
?> 