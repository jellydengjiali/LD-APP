<?php
	$username=$password=$realname=$sex=$birthyear=$birthplace=$phonenum=$QQNum=$Email=$payNum=$repassword="";
	if($_SERVER["REQUEST_METHOD"]=="POST")
	{
		$username=$_POST["username"];
		$password=md5($_POST["password"]);
		$realname=$_POST["name"];
		$sex=$_POST["sex"];
		$birthyear=$_POST["birthyear"];
		$birthplace=$_POST["birthplace"];
		$phonenum=$_POST["phone"];
		$QQNum=$_POST["QQNum"];
		$Email=$_POST["Email"];
		$payNum=$_POST["payNum"];
		$repassword=$_POST["repassword"];
		$userWavFile="/home/duisheng/SpeechGroup/SpeechRecordData/".$username;
		// echo $username.$password.$realname.$sex.$birthyear.$birthplace.$phonenum.$QQNum.$Email.$payNum.$repassword;
		$con=mysql_connect("localhost","root","");
		if(!$con) {
			die('Count not connect SQL.');
		}
		// mysql_query("SET NAMES 'utf8'"); 
		mysql_select_db("unifo",$con);
		//检查用户名是否已经被使用；
		$sql = "SELECT * FROM students WHERE UserName='$username'";
		$result=mysql_query($sql, $con);
		$row=mysql_fetch_array($result);
		if($row) 
		{
			printf("用户名已经被注册。");
		}		
		else
		{
			mysql_query("SET NAMES 'utf8'");
			mysql_select_db("unifo",$con);
			$sql = "INSERT INTO students (UserName,Password,RealName,sex,birthyear,birthplace,PhoneNumber,QQNumber,PayNumber,Email,UserWavFile) 
				VALUES('$username','$password','$realname','$sex','$birthyear','$birthplace','$phonenum','$QQNum','$payNum','$Email','$userWavFile')";
			$result = mysql_query($sql, $con);
			if (!$result) {
				die('Error: ' . mysql_error());
			}
			echo "1 record added";
		}
		mysql_close($con);
		
	}
?>