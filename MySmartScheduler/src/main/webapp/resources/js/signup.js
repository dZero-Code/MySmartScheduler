$(document).ready(function(){
	/************************* 입력값 초기화 *************************/
	// 페이지 리로딩시 input의 입력값 초기화 시키기 위한 부분
	jQuery('#email').val('')
	jQuery('#pw').val('')
	jQuery('#rePw').val('')
	jQuery('#nickname').val('')
	/************************* 입력값 초기화 *************************/
	
	
	/************************* 포커스시 input 라벨 표시/숨김 *************************/
	// 포커스 및 포커스 아웃될 객체를 받아오는 부분
	var placeholderTarget = $('.textbox input[type="text"], .textbox input[type="password"]'); 

	// 포커스시 
	placeholderTarget.on('focus', function(){ 
		$(this).siblings('label').fadeOut('fast'); 		// label 숨기기 
	}); 

	// 포커스아웃시 input 객체의 값이 없는 경우
	placeholderTarget.on('focusout', function(){ if($(this).val() == ''){ 
		$(this).siblings('label').fadeIn('fast'); } 	// label 보이기 
	});
	/************************* 포커스시 input 라벨 표시/숨김 *************************/
	
	
	/************************* 회원가입 *************************/
	var success = false;	// 회원가입 가능 여부
	$("#btn_register").click(function(){
		event.preventDefault();				// submit 기능을 제어하기 위한 함수
		
		// 이메일 미입력시
		if($("#email").val()==""){
			jQuery('#chk_email').css('display', 'block')	// 이메일 입력을 요구하는 label 출력
			$("#email").focus();							// 이메일 포커스
			sucess=false;									// 회원가입 불가
			return;
		// 이메일 입력시 정규표현식을 통한 이메일 형식 체크
		}else{
			// 이메일 정규표현식
			var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			
			// 입력한 값이 이메일 형식이 아닌 경우
			if (!$("#email").val().match(emailRegex)){
				jQuery('#form_email').css('display', 'block')	// 이메일 형식 확인을 요구하는 label 출력
				$("#email").focus();							// 이메일 포커스
				return;
			}
			success=true;										// 회원가입 가능
		}
		
		// 비밀번호 미입력시
		if($("#pw").val()==""){
			jQuery('#chk_pw').css('display', 'block')	// 비밀번호 입력을 요구하는 label 출력
			$("#pw").focus();							// 비밀번호 포커스
			sucess=false;								// 회원가입 불가능
			return;
		// 비밀번호 입력시
		}else{
			/*
				조건1. 6~20 영문 대소문자
				조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함   
			*/
			var pwRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
			
			// 입력한 값이 비밀번호 형식과 맞지 않은 경우
			if (!$("#pw").val().match(pwRegex)){
				jQuery('#form_pw').css('display', 'block')	// 비밀번호 형식 확인을 요구하는 label
				$("#pw").focus();							// 비밀번호 포커스
				sucess = false;								// 회원가입 불가능
				return;
			}
			jQuery('#form_pw').css('display', 'none')		// 비밀번호 형식 확인을 요구하는 label 숨기기
			success=true;									// 회원가입 가능
		}
		
		// 비밀번호 확인 미입력시
		if($("#rePw").val()==""){
			jQuery('#chk_rePw').css('display', 'block')		// 비밀번호 확인 입력을 요구하는 label 출력
			$("#rePw").focus();								// 비밀번호 확인 포커스
			success=false;									// 회원가입 불가능
			return;
		}
		
		// 비밀번호와 비밀번호 확인이 일치 하지 않는 경우
		if($("#rePw").val()!=$("#pw").val()){
			jQuery('#chk_pwEqual').css('display', 'block')	// 비밀번호를 일치를 요구하는 label 출력
			$("#rePw").focus();								// 비밀번호 확인 포커스
			success=false;									// 회원가입 불가능
			return;
		}
		// 닉네임 미입력시
		if($("#nickName").val()==""){
			jQuery('#chk_nickName').css('display', 'block')	// 닉네임 입력을 요구하는 label 출력
			$("#nickName").focus();							// 닉네임 포커스
			success=false;									// 회원가입 불가능
			return;
		}
		
		// success가 true인 경우 submit 처리
		if(success)
			$("#form").submit();
	});
	/************************* 회원가입 *************************/
	
	
	/************************* Email 실시간 검증(ajax) *************************/
	// 이메일 입력창을 벗어난 경우
	$('#email').focusout(function() {
		// 이메일의 입력 값이 있는 경우
		if($('#email').val()!=""){
			// 이메일 유효성 검사
			var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			
			// 유효성 검사 실패 
			if(!$("#email").val().match(emailRegex)){
				jQuery('#form_email').css('display', 'block')
				success = false;
			// 유효성 검사 성공
			}else{
				// ajax를 통한 실시간 이메일 중복 확인
				jQuery.ajax({
					type : "get", 				// get방식
					url : "chkEmail",			// 요청 url
					data:{						// 전달할 파라미터 값
						email : $("#email").val()
					},
					dataType : "json",			// 데이터 타입 json
					async: false,				// ajax 동기화
					success : function(json){
						// ajax 처리 성공시 수행할 처리
						
						// 값이 존재하지 않음 : 사용가능한 이메일
						if(json["loginInfo"] === undefined){ 
							jQuery('#able_email').css('display', 'block')	// 사용가능한 이메일 라벨 출력
							success = true;									// 회원가입 가능
						// 값이 존재함 : 이미 사용중인 이메일
						}else{
							jQuery('#ano_email').css('display', 'block')	// 이미 사용중인 이메일 라벨 출력
							success = false;								// 회원가입 불가능
						}
					},
					error : function(error) {  
						alert("오류 발생"+ error);
						// 추후 에러 페이지로 이동
					}
				});
			}
		}
	});
	
	// 이메일 포커스 시 이메일에 관련된 모든 라벨 감추기
	$('#email').focus(function() {
		jQuery('#able_email').css('display', 'none')
		jQuery('#ano_email').css('display', 'none')	
		jQuery('#chk_email').css('display', 'none')
		jQuery('#form_email').css('display', 'none')
	});
	/************************* Email 실시간 검증(ajax) *************************/
	
	
	/************************* Pw 유효성 검사 *************************/
	// pw 입력창이 포커스를 벗어난 경우
	$('#pw').focusout(function() {
		
		// 비밀번호 정규표현식
		var pwRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
		
		// 비밀번호가 형식에 맞지 않는 경우
		if (!$("#pw").val().match(pwRegex)){
			jQuery('#form_pw').css('display', 'block')		// 비밀번호 확인을 요구하는 라벨 출력
			success=false;									// 회원가입 불가능
		}
		//jQuery('#form_pw').css('display', 'none')
		success=true;										// 회원가입 가능
	});
	
	// 비밀번호 포커스 시 비밀번호에 관련된 모든 라벨 감추기
	$('#pw').focus(function() {
		jQuery('#chk_pw').css('display', 'none')
		jQuery('#form_pw').css('display', 'none')	
		jQuery('#chk_rePw').css('display', 'none')
		jQuery('#chk_pwEqual').css('display', 'none')
	});
	/************************* Pw 유효성 검사 *************************/
	
	
	/************************* 취소버튼 클릭시 *************************/
	$("#btn_cancel").click(function(){
		event.preventDefault();
		window.history.back();
	});
	/************************* 취소버튼 클릭시 *************************/
});