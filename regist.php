<?php
	
	if($_SERVER["REQUEST_METHOD"]=="POST")
	{
		if($_POST["method"] == "ajaxRegist") {
			$formData = $_POST["formData"];
			$con=mysql_connect("localhost","root","250771564");
			if(!$con) {
				die('Count not connect SQL.');
			}
			// mysql_query("SET NAMES 'utf8'"); 
			mysql_select_db("unifo",$con);
			//检查用户名是否已经被使用；
			$username = $formData['name'];
			$sql = "SELECT * FROM users WHERE UserName='$username'";
			$result=mysql_query($sql, $con);
			$row=mysql_fetch_array($result);
			if($row) 
			{
				echo "false";
			}
			else
			{
				$password = $formData['password'];
				$sex = $formData['sex'];
				$birthday = $formData['date'];
				$telephone = $formData['phone'];
				mysql_query("SET NAMES 'utf8'");
				mysql_select_db("unifo",$con);
				$sql = "INSERT INTO users (UserName,Password,sex,birthday,PhoneNumber)
					VALUES('$username','$password','$sex','$birthday','$telephone')";
				$result = mysql_query($sql, $con);
				if (!$result) {
					die('Error: ' . mysql_error());
				}
				echo "true";
			}
			mysql_close($con);
		} else if($_POST['method']=="ajaxLogin") {
			$formData = $_POST['formData'];
			$username = $formData['name'];
			$password = $formData['password'];
			$con=mysql_connect("localhost","root","250771564");
			if(!$con) {
				die('Count not connect SQL.');
			}
			// mysql_query("SET NAMES 'utf8'"); 
			mysql_select_db("unifo",$con);
			//验证该用户；
			$sql = "SELECT * FROM users WHERE UserName='$username' AND Password='$password'";

			$result=mysql_query($sql, $con);
			$row=mysql_fetch_array($result);
			if($row)
			{
				echo "true";
			}
			else
			{
				echo "false";
			}
			mysql_close($con);
		}
	}
?>