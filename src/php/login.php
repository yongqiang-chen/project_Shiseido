<?php
	//跨域
	header("Access-Control-Allow-Origin:*");
	/* 登录 */
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
	$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
	//执行sql语句
	$result = mysql_query($sql);
	$row=mysql_fetch_array($result,MYSQL_ASSOC);
	// 判断
	if ($row) { // 查询成功
		$arr = array("res_code"=>1, "res_message"=>"查询成功");
		echo json_encode($arr);
	} else { // 失败
		$arr = array("res_code"=>0, "res_message"=>"查询失败" . mysql_error());
		echo json_encode($arr);
	}

	//关闭数据库
	mysql_close();
?> 