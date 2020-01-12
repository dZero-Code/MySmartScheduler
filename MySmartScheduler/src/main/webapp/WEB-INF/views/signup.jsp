<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
<title>회원가입</title>
<link rel="stylesheet" href="resources/css/signup.css" />
<link rel="stylesheet" href="resources/css/reset.css" />
	
<script type="text/javascript" src="resources/js/jquery-3.4.1.js"></script>
<script type="text/javascript" src="resources/js/signup.js"></script>
</head>
<body>
	<div class="page_wrap">
		<section id="main">
		  <section class="login">
				<section id="login_header">
					<span>회원가입</span>
				</section>
				<section id="login_cont">
					<form action="signup" method="post" id="form">
						<div class="textbox">
							<label for="email">이메일</label><br>
						  <input type="text" name="email" id="email" autocomplete="off">
						</div>
					  	<div class="labelbox">
							<label id="chk_email">이메일을 입력해주세요.</label>
							<label id="form_email">형식에 맞지 않는 이메일 입니다.</label>
							<label id="able_email">사용할 수 있는 이메일입니다.</label>
							<label id="ano_email">이미 등록된 이메일 입니다.</label>
						</div>
					  	<div class="textbox">
							<label for="pw">비밀번호</label><br>
							<input type="password" name="pw" id="pw">
						</div>
						<div class="labelbox">
							<label id="chk_pw">비밀번호를 입력해주세요.</label>
							<label id="form_pw">비밀번호는 6~20자리의 영문 대소문자 및 최소 1개의 숫자와  특수문자를 포함해야 합니다.</label>
						</div>
						<div class="textbox">
							<label for="rePw">비밀번호 확인</label><br>
							<input type="password" name="rePw" id="rePw">
						</div>
						<div class="labelbox">
							<label id="chk_rePw">비밀번호 확인을 입력해주세요.</label>
							<label id="chk_pwEqual">비밀번호가 다릅니다.</label>
						</div>
						<div class="textbox">
							<label for="nickName">닉네임</label><br>
							<input type="text" name="nickname" id="nickName" autocomplete="off">
						</div>
						<div class="labelbox">
							<label id="chk_nickName">닉네임을 입력해주세요.</label>
						</div>
						<div class="textbox">
							<button id="btn_register">회원가입</button><button id="btn_cancel">취소</button>
						</div>
					</form>
				</section>
			</section>
		</section>
	</div>
</body>
</html>