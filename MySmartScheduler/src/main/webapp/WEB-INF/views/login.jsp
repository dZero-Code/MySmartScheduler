<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="resources/js/jquery-3.4.1.js"></script>
<script type="text/javascript" src="resources/js/login.js"></script>

<link rel="stylesheet" href="resources/css/login.css" />
<link rel="stylesheet" href="resources/css/reset.css" />
</head>
<body>
	<div class="page_wrap">
		<section id="main">
		  <section class="login">
				<section id="login_header">
					<span>로그인</span>
				</section>
				<section id="login_cont">
					<div class="textbox">
						<label for="email">이메일</label><br>
					  <input type="text" name="email" id="email" autocomplete="off">
					</div>
				  <div class="labelbox">
						<label id="chk_email">이메일을 입력해주세요.</label>
					</div>
				  <div class="textbox">
						<label for="pw">비밀번호</label><br>
						<input type="password" name="pw" id="pw">
					</div>
					<div class="labelbox">
						<label id="chk_pw">비밀번호를 입력해주세요.</label>
						<label id="chk_login">이메일과 비밀번호를 확인해주세요.</label>
					</div>
					<div class="textbox">
						<button id="btn_login">로그인</button><button id="btn_signup">회원가입</button>
					</div>
				</section>
			</section>
		</section>
	</div>
</body>
</html>