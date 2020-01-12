<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 

<!DOCTYPE HTML>
<html>
	<head>
		<title>Team4</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
		<link rel="stylesheet" href="resources/css/groupList.css" />
		<link rel="stylesheet" href="resources/css/reset.css" />
		<link rel="stylesheet" href="resources/css/font-awesome.min.css" />
		<!-- jQuery UI -->
		<link rel="stylesheet" href="resources/css/jquery-ui.min.css" />
		
		<!-- font -->
    	<link href="https://fonts.googleapis.com/css?family=Abel&display=swap" rel="stylesheet">
    	
    	<!-- jQuery -->
    	<script type="text/javascript" src="resources/js/jquery-3.4.1.js"></script>
    	<script type="text/javascript" src="resources/js/jquery-ui.min.js"></script>
    	<script type="text/javascript" src="resources/js/group.js"></script>
    	<script type="text/javascript">
			var email = '<%=session.getAttribute("email") %>'
		</script>
	</head>
<body>
	<div id="page_wrap">
		<header id="header">
			<ul class="option">
				<li><a href="addGroup" id="addGroup">그룹 만들기</a></li>
				<li><a href="joinGroup" id="joinGroup">그룹 신청하기</a></li>
			</ul>
			<ul class="user_info">
				<li><a href="logout"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a></li>
			</ul>
		</header>
		<section id="main">
			<nav id="menu">
				<ul>
					<li><a href="main" id="home"><i class="fa fa-home" aria-hidden="true"></i></a></li>
					<li><a href="groupList" class="active" id="group_page"><i class="fa fa-users" aria-hidden="true"></i></a></li>
					<li><a href="calendar" id="calendarPage"><i class="fa fa-calendar" aria-hidden="true"></i></a></li>
				</ul>
			</nav>
			<section id="contents">
				<!-- 
				<div class="group_list">
					<div class="groups">
						<div class="groups_cont">
							그룹번호 : 1
							그룹이름 : KIC캠퍼스
							그룹장 : 박영권
						</div>
						<div class="groups_option">
							<button>할일 목록</button>
							<button>그룹나가기</button>
							<button>그룹관리</button>
						</div>
					</div>
				</div>
				 -->
			</section>
		</section>
	</div>
	
	<!-- 추가 팝업 -->
	<div class="pop_box">
		<div class="pop_bg"></div>
       	<div class="pop_contents">
			
       	</div>
	</div>
	
	<div class="addGroup_popup">
		<div class="pop_bg"></div>
       	<div class="addGroup_contents">
			<form action="addGroups" method="post" id="addGroupFrm" onsubmit="return false;">
				<div class="popup_cont">
					<p class="popup_header">생성할 그룹이름을 적어주세요</p>
					<input type="text" name="group_name">
					<input type="hidden" name="group_leader" value="<%=session.getAttribute("email") %>">
				</div>
				<div class="popup_option">
					<button id="btn_addGroup" class="popup_btn">그룹 생성하기</button>
					<button id="addGroup_cancel" class="popup_btn">취소</button>
				</div>
			</form>
       	</div>
	</div>
	
	<div class="joinGroup_popup">
		<div class="pop_bg"></div>
       	<div class="joinGroup_contents">
			<form action="joinGroups" method="post" id="joinGroupFrm" onsubmit="return false;">
				<div class="popup_cont">
					<p class="popup_header">참여할 그룹번호를 적어주세요</p>
					<input type="text" name="group_no">
					<input type="hidden" name="group_members" value="<%=session.getAttribute("email") %>">
				</div>
				<div class="popup_option">
					<button id="btn_joinGroup" class="popup_btn">그룹 참가신청</button>
					<button id="joinGroup_cancel" class="popup_btn">취소</button>
				</div>
			</form>
       	</div>
	</div>
</body>
</html>