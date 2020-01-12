jQuery(document).ready(function(){
	/*********************** Todo ***********************/
	// 페이지 리로딩시 자동으로 할일 리스트를 받아옴
	list("0", "0", email);		// 상태값 : 0, 순번 : 0, 사용자 이메일
	
	
	/*********************** Detail ***********************/
	// 세부정보를 팝업 형식으로 보여주기 위해 해당 팝업영역을 받아서 변수처리
	var panel = jQuery(".pop_box");
    var panelContents = panel.find(".pop_contents");
    
    // 해당 할일 클릭시 팝업을 보여주기
	jQuery(document).on('click','.center',function(){
		// 클릭한 할일의 ID값(순번) 가져오기
		var todo_no = jQuery(this).attr('id');
        
		// 팝업 열기
		popupOpen(panel, panelContents);
		
        // Ajax 통신을 통한 팝업에 세부정보 입력 및 출력
        detail(email, todo_no);
    });
	
	// 팝업 닫기 이벤트 정의
	jQuery(document).on("click", "#btn_cancel",popupClose);
	jQuery(document).on("click", "#btn_cancel2",popupClose);

    // 팝업 배경 클릭 이벤트 정의
    panel.find(".pop_bg").on("click", popupClose);
    
    // 팝업 닫기 함수
    function popupClose(e) {
    	// 해당 팝업 감추기
        panel.fadeOut();
        
        // 이벤트 기본 동작 중단
        e.preventDefault();
    }
    
    /*********************** 추가 팝업 페이지 ***********************/
    // 할일 추가 버튼 클릭시 추가 팝업 페이지를 출력
    jQuery('#add').bind('click', function(e){
    	e.preventDefault();
    	
    	// 팝업 열기
    	popupOpen(panel, panelContents)
        
        // Ajax 통신을 통한 팝업에 추가 폼 출력
        addPage(email);

    	// 팝업 닫기 이벤트 정의
    	jQuery(document).on("click", "#btn_cancel",popupClose);
    	jQuery(document).on("click", "#btn_cancel2",popupClose);

        // 팝업 배경 클릭 이벤트 정의
        panel.find(".pop_bg").on("click", popupClose);
        
        // 팝업 닫기 함수
        function popupClose(e) { 
        	// 해당 팝업 감추기
            panel.fadeOut();
            
            // 이벤트 기본 동작 중단
            e.preventDefault();
        }
    });    
    
    /*********************** 추가 ***********************/
    // 할일 추가 페이지에서 추가버튼 클릭시
    jQuery(document).on("click", "#btn_add", function() {
    	// 추가 여부 확인
    	var addConfirm = confirm('추가하시겠습니까?');
    	
    	// 추가하는 경우
    	if(addConfirm){
    		// 해당 입력폼의 값을 변수처리
	    	let email = jQuery('#addFrm').find('input[name="email"]').val();
	    	let title = jQuery('#addFrm').find('input[name="title"]').val();
	    	let content = jQuery('#addFrm').find('textarea[name="content"]').val();
	    	let start_reg = jQuery('#addFrm').find('input[name="start_reg"]').val();
	    	let finish_reg = jQuery('#addFrm').find('input[name="finish_reg"]').val();
	    	let priority = jQuery('#addFrm').find('input[name="priority"]').val();
			
	    	// 존재하지 않으면 포커스를 해주면서 추가 불가 (모든 값이 입력되면 추가가능)
			if (title == "") {
				jQuery('#addFrm').find('input[name="title"]').focus();
				return;
			}
			if (content == "") {
				jQuery('#addFrm').find('textarea[name="content"]').focus();
				return;
			}
			if (start_reg == "") {
				jQuery('#addFrm').find('input[name="start_reg"]').focus();
				return;
			}
			if (finish_reg == "") {
				jQuery('#addFrm').find('input[name="finish_reg"]').focus();
				return;
			}
			if (priority == "") {
				jQuery('#addFrm').find('input[name="priority"]').focus();
				return;
			}
	
			// 모든 값이 입력된 경우 Ajax를 통한 할일 추가
			add(email,title,content,start_reg,finish_reg, priority);
    	}
	});
    
	/*********************** 수정 ***********************/	
    // 할일 수정 팝업 페이지에서 수정버튼 클릭시
    jQuery(document).on("click", "#btn_modify", function() {
    	// 수정 여부 확인
    	var modifyConfirm = confirm('수정하시겠습니까?');
    	
    	// 수정하는 경우
    	if(modifyConfirm){
    		// 해당 입력폼의 값을 변수처리
	    	let no = jQuery('#modifyFrm').find('input[name="no"]').val();
	    	let email = jQuery('#modifyFrm').find('input[name="email"]').val();
	    	let title = jQuery('#modifyFrm').find('input[name="title"]').val();
	    	let content = jQuery('#modifyFrm').find('textarea[name="content"]').val();
	    	let start_reg = jQuery('#modifyFrm').find('input[name="start_reg"]').val();
	    	let finish_reg = jQuery('#modifyFrm').find('input[name="finish_reg"]').val();
	    	let priority = jQuery('#modifyFrm').find('input[name="priority"]').val();
			
	    	// 존재하지 않으면 포커스를 해주면서 수정 불가 (모든 값이 입력되면 수정가능)
			if (title == "") {
				jQuery('#modifyFrm').find('input[name="title"]').focus();
				return;
			}
			if (content == "") {
				jQuery('#modifyFrm').find('textarea[name="content"]').focus();
				return;
			}
			if (start_reg == "") {
				jQuery('#modifyFrm').find('input[name="start_reg"]').focus();
				return;
			}
			if (finish_reg == "") {
				jQuery('#modifyFrm').find('input[name="finish_reg"]').focus();
				return;
			}
	
			// 모든 값이 입력된 경우 Ajax를 통한 할일 수정
			modify(no,email,title,content,start_reg,finish_reg, priority);
    	}
	});
    
});

/*****************************************************************************************/
/* 할일 리스트 보기 */
function list(status, no, email){
	jQuery.ajax({
		type : 'get',					// get 방식
		url : 'todoList',				// 요청 url
		data : {						// 전달할 데이터
			'status' : status,
			'no' : no,
			'email' : email
		},
		dataType : 'json',				// 데이터 타입 json
		error : function(){				// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){		// ajax 통신 성공시
			// 해당 영역의 기존 내용 비우기
			jQuery('#todo_cont').empty();
			jQuery('#do_cont').empty();
			jQuery('#done_cont').empty();
			
			// json으로 받아온 값 변수처리
			const list = json.data;
			
			// 각각의 영역에 데이터를 입력하기 위한 변수 초기화
			let todoStr = "";
			let doStr = "";
			let doneStr = "";
			
			jQuery(list).each(function(i, obj){
				// 받아온 할일 데이터의 할일 상태가 1인경우 (Todo)
				if(obj.status == 1){
					todoStr += "<div class='todo'>";
					
					// 할일 상태를 이전 상태로 변경하는 영역 (Todo의 이전 상태는 없으므로 hidden 처리)
					todoStr += "<div class = 'prev'>";
					todoStr += "<button class='btn_prev' style='visibility: hidden;'><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></button>";
					todoStr += "</div>";
					
					// 할일의 내용을 보여주는 영역
					todoStr += "<div class ='center' id='"+obj["no"]+"'>";
					todoStr += "<p class='title'>"+obj["title"]+"</p><br>";
					todoStr += "<p class='reg'>"+obj["start_reg"]+"&nbsp;~&nbsp;"+obj["finish_reg"]+"</p><br>"
					todoStr += "</div>";
					
					// 할일 상태를 다음 상태로 변경 및 할일 삭제를 위한 영역
					todoStr += "<div class = 'next'>";
					todoStr += "<button class='delete' onClick=javascript:del(email,'"+obj["no"]+"')><i class='fa fa-times-circle' aria-hidden='true'></i></button>";
					todoStr += "<button class='btn_next' onClick=javascript:list('2','"+obj["no"]+"',email)><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></button>";
					todoStr += "</div>";
					
					todoStr += "</div>";
				// 받아온 할일 데이터의 할일 상태가 2인경우 (Do)
				}else if(obj.status == 2){
					doStr += "<div class='todo'>";
					
					// 할일 상태를 이전 상태로 변경하는 영역
					doStr += "<div class = 'prev'>";
					doStr += "<button class='btn_prev' onClick=javascript:list('1','"+obj["no"]+"',email)><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></button>";
					doStr += "</div>";
					
					// 할일의 내용을 보여주는 영역
					doStr += "<div class ='center' id='"+obj["no"]+"'>";
					doStr += "<p class='title'>"+obj["title"]+"</p><br>";
					doStr += "<p class='reg'>"+obj["start_reg"]+"&nbsp;~&nbsp;"+obj["finish_reg"]+"</p><br>"
					doStr += "</div>";
					
					// 할일 상태를 다음 상태로 변경 및 할일 삭제를 위한 영역
					doStr += "<div class = 'next'>";
					doStr += "<button class='delete' onClick=javascript:del(email,'"+obj["no"]+"')><i class='fa fa-times-circle' aria-hidden='true'></i></button>";
					doStr += "<button class='btn_next' onClick=javascript:list('3','"+obj["no"]+"',email)><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></button>";
					doStr += "</div>";
					
					doStr += "</div>";
				// 받아온 할일 데이터의 할일 상태가 3인경우 (Done)
				}else if(obj.status == 3){
					doneStr += "<div class='todo'>";
					
					// 할일 상태를 이전 상태로 변경하는 영역
					doneStr += "<div class = 'prev'>";
					doneStr += "<button class='btn_prev' onClick=javascript:list('2','"+obj["no"]+"',email)><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></button>";
					doneStr += "</div>";
					
					// 할일의 내용을 보여주는 영역
					doneStr += "<div class ='center' id='"+obj["no"]+"'>";
					doneStr += "<p class='title'>"+obj["title"]+"</p><br>";
					doneStr += "<p class='reg'>"+obj["start_reg"]+"&nbsp;~&nbsp;"+obj["finish_reg"]+"</p><br>"
					doneStr += "</div>";
					
					// 할일 상태를 다음 상태로 변경하는 영역 (Done의 다음 상태는 없으므로 hidden 처리) 및 할일 삭제를 위한 영역
					doneStr += "<div class = 'next'>";
					doneStr += "<button class='delete' onClick=javascript:del(email,'"+obj["no"]+"')><i class='fa fa-times-circle' aria-hidden='true'></i></button>";
					doneStr += "<button class='btn_next' style='visibility: hidden;'><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></button>";
					doneStr += "</div>";
					
					doneStr += "</div>";
				}
			});
			
			// 각각의 영역의 각각의 데이터 추가하여 출력
			jQuery('#todo_cont').append(todoStr);
			jQuery('#do_cont').append(doStr);
			jQuery('#done_cont').append(doneStr);
			
			/* Css 파일 읽기 */
			jQuery('<link rel="stylesheet" href="resources/css/memo.css" type="text/css" />').appendTo('head');
		}
	});
}

/* todo 상세보기 */
function detail(email, no){
	jQuery.ajax({
		type : 'get',				// get 방식
		url : 'todoDetail',			// 요청 url
		data : {					// 전달할 데이터
			'email':email,
			'no':no
		},
		dataType : 'json',			// 데이터 타입은 json
		error : function(){			// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){	// ajax 통신 성공시
			// 해당 영역의 이전 값 초기화
			jQuery('.pop_contents').empty();
			
			// json으로 받은 데이터 변수처리
			const detailList = json.data;
			
			let popupStr = '';
			// 데이터 출력 영역
			popupStr += "<div class='div_cont' id='"+detailList["no"]+"'>";
			popupStr += "<p class='title'>제목 : "+detailList["title"]+"</p>";
			popupStr += "<p class='content'>내용 : "+detailList["content"]+"</p>";
			popupStr += "<p class='reg'>기간 : "+detailList["start_reg"]+"&nbsp;~&nbsp;"+detailList["finish_reg"]+"</p>";
			popupStr += "<p class='priority'>우선순위 : "+detailList["priority"]+"</p>";
			popupStr += "</div>";

			// 버튼 영역
			popupStr += "<div class='div_btn'>";
			popupStr += "<button id='btn_modifyPage' class='pop_btn' onClick=javascript:modifyPage(email,'"+detailList["no"]+"')>수정페이지</button>";		// 클릭시 수정 페이지 팝업으로 이동
			popupStr += "<button id='btn_cancel' class='pop_btn'>취소</button>";
			popupStr += "</div>";
			
			// 팝업 영역에 셋팅한 데이터 추가
			jQuery('.pop_contents').append(popupStr);
			jQuery('<link rel="stylesheet" href="resources/css/popup.css" type="text/css" />').appendTo('head');
		}
	});
}

/* todo 데이터 추가 페이지 */
function addPage(email){
	jQuery.ajax({
		type : 'get',				// get 방식
		url : 'addPage',			// 요청 url
		data: {						// 전달할 데이터
			'email':email
		},
		dataType : 'json',			// 데이터 타입은 json
		error : function(){			// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){	// ajax 통신 성공시
			// 해당 영역의 기존 내용 비우기
			jQuery('.pop_contents').empty();
			
			// json으로 받은 값 변수처리(사용자 email)
			let email = json.data;
			
			let popupStr = '';
			
			// 입력 폼 형식으로 팝업 페이지 셋팅
			popupStr += "<form action='add' id='addFrm' method='post' onsubmit='return false;'>"
			popupStr += "<input type='hidden' id='email' name='email' value='"+email+"' autocomplete='off'>";
			popupStr += "<div class='div_cont'>";
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='title' name='title' placeholder='제목을 입력해주세요' autocomplete='off'>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<textarea id='content' name='content' placeholder='내용을 입력해주세요'></textarea>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='start_reg' name='start_reg' placeholder='시작날짜를 입력해주세요' autocomplete='off'>";
			popupStr += "&nbsp;&nbsp;~&nbsp;&nbsp;"
			popupStr += "<input type='text' id='finish_reg' name='finish_reg' placeholder='종료날짜를 입력해주세요' autocomplete='off'>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='priority' name='priority' placeholder='우선순위를 입력해주세요.' autocomplete='off'>";
			popupStr += "</div>";
			popupStr += "</div>";

			popupStr += "<div class='div_btn'>";
			popupStr += "<button id='btn_add' class='pop_btn'>추가하기</button>";
			popupStr += "<button id='btn_cancel2' class='pop_btn'>취소</button>";
			popupStr += "</div>";
			popupStr += "</form>";
			
			jQuery('.pop_contents').append(popupStr);
			
			// 날짜 입력폼 클릭시 캘린더 형식으로 선택하기 위한 jQuery에서 제공되는 datepicker 사용
			jQuery(document).find("input[name=start_reg]").datepicker({
				minDate : 0, 																			//  현재 날짜 이전은 선택 불가하게 설정
				changeMonth: true, 																		// 월을 바꿀수 있는 셀렉트 박스를 표시한다.
				changeYear: true, 																		// 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
				dayNamesMin:["일","월","화","수","목","금","토"],											// 요일에 표시되는 형식 설정
		        dateFormat:"yy-mm-dd", 																	//날짜 형식 설정
		        monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], 		//월표시 형식 설정
		    	onClose : function(selectedDate) {
					// 시작일(fromDate) datepicker가 닫힐때
					// 종료일(toDate)의 선택할수있는 최소 날짜(minDate)를 선택한 시작일로 지정
					$("#finish_reg").datepicker("option", "minDate", selectedDate);
				}
			});
			jQuery(document).find("input[name=finish_reg]").datepicker({
				changeMonth: true, 																		// 월을 바꿀수 있는 셀렉트 박스를 표시한다.
				changeYear: true, 																		// 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
				dayNamesMin:["일","월","화","수","목","금","토"], 											// 요일에 표시되는 형식 설정
			    dateFormat:"yy-mm-dd", //날짜 형식 설정
			    monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], 		//월표시 형식 설정
			    onClose : function(selectedDate) {
					// 종료일(toDate) datepicker가 닫힐때
					// 시작일(fromDate)의 선택할수있는 최대 날짜(maxDate)를 선택한 종료일로 지정 
					$("#start_reg").datepicker("option", "maxDate", selectedDate);
				}
			});
			
			jQuery('<link rel="stylesheet" href="resources/css/addTodo.css" type="text/css" />').appendTo('head');
		}
	});
}

/* 할일 데이터 추가 */
function add(email,title,content,start_reg,finish_reg,priority) {
	jQuery.ajax({
		type : 'post',					// post 방식
		url : 'add',					// 요청 url
		data: {							// 전달할 데이터
			'email':email,
			'title':title,
			'content':content,
			'start_reg':start_reg,
			'finish_reg':finish_reg,
			'priority':priority
		},
		dataType : 'json',				// 데이터 타입 json
		error : function(){				// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(){			// ajax 통신 성공시
			// 할일 리스트로 이동하면서 해당 팝업 닫기
			list("0","0", email);
			jQuery(".pop_box").fadeOut();
		}
	});
}

/* 할일 수정 페이지로 이동 */
function modifyPage(email, no){
	jQuery.ajax({
		type : 'get',				// get 방식
		url : 'modifyPage',			// 요청 url
		data : {					// 전달할 데이터
			'no':no,
			'email':email
		},
		dataType : 'json',			// 데이터 타입 json
		error : function(){			// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){	// ajax 통신 성공시
			// 기존의 영역 초기화
			jQuery('.pop_contents').empty();
			
			// json으로 받은 값 변수처리
			const modifyList = json.data;
			
			// 입력 폼 형식으로 팝업 페이지 셋팅
			let popupStr = '';
			popupStr += "<form action='modify' id='modifyFrm' method='post' onsubmit='return false;'>"
			popupStr += "<input type='hidden' id='no' name='no' value='"+modifyList["no"]+"'>";
			popupStr += "<input type='hidden' id='email' name='email' value='"+modifyList["email"]+"''>";
			popupStr += "<div class='div_cont'>";
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='title' name='title' placeholder='제목을 입력해주세요.' value='"+modifyList["title"]+"' autocomplete='off'><br>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<textarea id='content' name='content' placeholder='내용을 입력해주세요.'>"+modifyList["content"]+"</textarea><br>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='start_reg' name='start_reg' placeholder='시작날짜를 입력해주세요.' value='"+modifyList["start_reg"]+"' autocomplete='off'>";
			popupStr += "&nbsp;&nbsp;~&nbsp;&nbsp;"
			popupStr += "<input type='text' id='finish_reg' name='finish_reg' placeholder='종료날짜를 입력해주세요.' value='"+modifyList["finish_reg"]+"' autocomplete='off'>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='priority' name='priority' placeholder='우선순쉬를 입력해주세요.' value='"+modifyList["priority"]+"' autocomplete='off'><br>";
			popupStr += "</div>";
			popupStr += "</div>";

			popupStr += "<div class='div_btn'>";
			popupStr += "<button id='btn_modify' class='pop_btn'>수정하기</button>";
			popupStr += "<button id='btn_back' class='pop_btn' onClick=javascript:detail('"+modifyList["email"]+"','"+modifyList["no"]+"')>취소</button>";
			popupStr += "</div>";
			popupStr += "</form>";
				
			jQuery('.pop_contents').append(popupStr);
			
			jQuery(document).find("input[name=start_reg]").datepicker({
				minDate : 0, 																		//  현재 날짜 이전은 선택 불가하게 설정
				changeMonth: true, 																	// 월을 바꿀수 있는 셀렉트 박스를 표시한다.
				changeYear: true, 																	// 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
				dayNamesMin:["일","월","화","수","목","금","토"], 										// 요일에 표시되는 형식 설정
		        dateFormat:"yy-mm-dd", 																//날짜 형식 설정
		        monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],	//월표시 형식 설정
		    	onClose : function(selectedDate) {
					// 시작일(fromDate) datepicker가 닫힐때
					// 종료일(toDate)의 선택할수있는 최소 날짜(minDate)를 선택한 시작일로 지정
					$("#finish_reg").datepicker("option", "minDate", selectedDate);
				}
			});
			jQuery(document).find("input[name=finish_reg]").datepicker({
				changeMonth: true, 																	// 월을 바꿀수 있는 셀렉트 박스를 표시한다.
				changeYear: true, 																	// 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
				dayNamesMin:["일","월","화","수","목","금","토"], 										// 요일에 표시되는 형식 설정
			    dateFormat:"yy-mm-dd", 																//날짜 형식 설정
			    monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], 	//월표시 형식 설정
			    onClose : function(selectedDate) {
					// 종료일(toDate) datepicker가 닫힐때
					// 시작일(fromDate)의 선택할수있는 최대 날짜(maxDate)를 선택한 종료일로 지정 
					$("#start_reg").datepicker("option", "maxDate", selectedDate);
				}
			});
			
			jQuery('<link rel="stylesheet" href="resources/css/modify.css" type="text/css" />').appendTo('head');
		}
	});
}

/* 할일 데이터 수정 */
function modify(no,email,title,content,start_reg,finish_reg,priority){
	jQuery.ajax({
		type : 'post',					// post 방식
		url : 'modify',					// 요청 url
		data : {						// 전달할 데이터
			'no':no,
			'email':email,
			'title':title,
			'content':content,
			'start_reg':start_reg,
			'finish_reg':finish_reg,
			'priority':priority
		},
		dataType : 'json',				// 데이터 타입 json
		error : function(){				// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){		// ajax 통신 성공시
			// 수정 성공 여부를 받아옴
			const modifyList = json.data;
			
			// 성공시
			if(modifyList.check){
				// 할일 리스트를 보여주면서 팝업 닫기
				list("0", "0", email);
				$(".pop_box").fadeOut();
			}else{
				alert("error");
			}
		}
	});
}

/* 할일 데이터 삭제 */
function del(email, no){
	var delConfirm = confirm('삭제하시겠습니까?');		// 삭제여부 확인
	
	// 삭제 시
	if (delConfirm){
		jQuery.ajax({
			type : 'post',				// post 방식
			url : 'delete',				// 요청 url
			data : {					// 전달할 데이터
				'no' : no
			},
			dataType : 'json',			// 데이터 타입 json
			error : function(){			// ajax 통신 실패시
				//alert("error");
				window.location.href = 'error';
			},
			success : function(json){	// ajax 통신 성공시
				const addList = json.data;

				// 성공시
				if(addList.check){
					// 할일 리스트를 보여주면서 팝업 닫기
					list("0", "0", email);
					jQuery(".pop_box").fadeOut();
				}else{
					alert("error");
				}
			}
		});
	}
}

/* 팝업 설정 */
function popupOpen(panel, panelContents){
	// 팝업 가운데 설정을 위한 가로 영역 설정
	if (panelContents.outerWidth() < jQuery(document).width()) {
        panelContents.css("margin-left", "-" + panelContents.outerWidth() / 2 + "px");
    } else {
        panelContents.css("left", "0px");
    }

    // 팝업 가운데 설정을 위한 세로 영역 설정
    if (panelContents.outerHeight() < jQuery(document).height()) {
        panelContents.css("margin-top", "-" + panelContents.outerHeight() / 2 + "px");
    } else {
        panelContents.css("top", "0px");
    }

    // 레이어 팝업 열기
    panel.fadeIn();
}