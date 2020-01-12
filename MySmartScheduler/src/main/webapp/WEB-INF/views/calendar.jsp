<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 

<!DOCTYPE HTML>
<html>
	<head>
		<title>Team4</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
		<link rel="stylesheet" href="resources/css/calendar.css" />
		<link rel="stylesheet" href="resources/css/reset.css" />
		<link rel="stylesheet" href="resources/css/font-awesome.min.css" />
		
		<!-- font -->
    	<link href="https://fonts.googleapis.com/css?family=Abel&display=swap" rel="stylesheet">
    	
    	<!-- jQuery -->
    	<script type="text/javascript" src="resources/js/jquery-3.4.1.js"></script>
		<script type="text/javascript" src="resources/js/calendar.js"></script>
		<script type="text/javascript">
			var email = '<%=session.getAttribute("email") %>'
		</script>
	</head>
<body>
	<div id="page_wrap">
		<header id="header">
			<ul class="option">
				<li></li>
			</ul>
			<ul class="user_info">
				<li><a href="logout"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a></li>
			</ul>
		</header>
		<section id="main">
			<nav id="menu">
				<ul>
					<li><a href="main" id="home"><i class="fa fa-home" aria-hidden="true"></i></a></li>
					<li><a href="groupList" id="groupPage"><i class="fa fa-users" aria-hidden="true"></i></a></li>
					<li><a href="calendar" class="active" id="calendarPage"><i class="fa fa-calendar" aria-hidden="true"></i></a></li>
				</ul>
			</nav>
			<section id="contents">
				
			</section>
			<form action="#" id="preNofrm">
				<input type="hidden" name="preNo" value="0">
				<input type="hidden" name="tempReg" value="0">
			</form>
		</section>
	</div>
</body>
</html>