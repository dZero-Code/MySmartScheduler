jQuery(document).ready(function(){
	/************************* 입력값 초기화 *************************/
	// 페이지 리로딩시 input의 입력값 초기화 시키기 위한 부분
	jQuery('#email').val('')
	jQuery('#pw').val('')
	/************************* 입력값 초기화 *************************/

	
	/************************* 포커스시 input 라벨 표시/숨김 *************************/
	// 포커스 및 포커스 아웃될 객체를 받아오는 부분
	var placeholderTarget = jQuery('.textbox input[type="text"], .textbox input[type="password"]'); 
	
	//포커스시 
	placeholderTarget.on('focus', function(){ 
		jQuery(this).siblings('label').fadeOut('fast');		// label 숨기기 
	}); 
	
	//포커스아웃시 input 객체의 값이 없는 경우
	placeholderTarget.on('focusout', function(){ if($(this).val() == ''){ 
		jQuery(this).siblings('label').fadeIn('fast'); }	// label 보이기 
	});
	/************************* 포커스시 input 라벨 표시/숨김 *************************/

	
	/************************* ajax 사용을 통한 실시간 로그인 파악 *************************/
	// 로그인 버튼 클릭시
	jQuery("#btn_login").click(function(){
		// 버튼 클릭시 라벨 초기화
		jQuery('#chk_email').css('display', 'none')
		jQuery('#chk_pw').css('display', 'none')
		jQuery('#chk_login').css('display', 'none')
		
		// 이메일 미입력시
		if(jQuery("#email").val()==""){
			jQuery('#chk_email').css('display', 'block')	// 이메일 입력을 요구하는 label 출력
			jQuery("#email").focus();						// 이메일 포커스
			return;
		}
		
		// 비밀번호 미입력시
		if(jQuery("#pw").val()==""){
			jQuery('#chk_pw').css('display', 'block')		// 비밀번호 입력을 요구하는 label 출력
			jQuery("#pw").focus();							// 비밀번호 포커스
			return;
		} 
		
		// Ajax 처리 (post)
		jQuery.ajax({
			type : "post", 	// POST 방식
			url : "login", 	// Controller에서 login을 잡기 위한 요청 url
			data:{			// 전달할 파라미터
				email : $("#email").val(),
				pw : $("#pw").val()
			},
			dataType : "json", 				// 데이터 타입 json
			async: false,					// ajax 동기화
			success : function(data){		// ajax 성공시 수행
				// 받아온 데이터의 값이 없는 경우 (로그인 실패 -> DB에서 해당 이메일, 비번과 매칭되는 값이 없는 경우)
				if(data.loginInfo === undefined){
					jQuery('#chk_login').css('display', 'block')	// 해당 이메일과 비밀번호 확인을 요구하는 라벨 출력
				}else{
					// 받아온 데이터의 값이 있는 경우 (로그인 가능 -> main으로 이동)
					window.location.href = "main"
				}
			},	
			error : function(error) {		// ajax 실패시 할일 
				window.location.href = "error"
			}
		});
		/* end of ajax */
	});
	/* end of 로그인 버튼 클릭 */
	/************************* ajax 사용을 통한 실시간 로그인 파악 *************************/
	
	
	/************************* 회원가입 버튼 클릭시 *************************/
	jQuery("#btn_signup").click(function(){
		window.location.href = "signup"
	});
	/************************* 회원가입 버튼 클릭시 *************************/
});

