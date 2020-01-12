jQuery(document).ready(function(){
	/*********************** 그룹 리스트 출력 ***********************/
	list(email);
	
    /*********************** 그룹생성 ***********************/
	// 그룹 생성 팝업 영역 설정
	var addPanel = jQuery(".addGroup_popup");
    var addPanelContents = addPanel.find(".addGroup_contents");
    
    // 그룹 생성 버튼 클릭시 그룹 생성 팝업 페이지 보여주기
    jQuery('#addGroup').bind('click', function(e){
    	e.preventDefault();
    	
		popupOpen(addPanel, addPanelContents)
    });
    
    // 레이어 팝업 닫기
    popupClose(addPanel);
   
    // 그룹 생성 버튼 클릭시
    jQuery(document).on("click", "#btn_addGroup", function() {
    	//입력 받은 그룹명과 히든 처리한 그룹장의 데이터를 변수처리
    	let group_name = jQuery('#addGroupFrm').find('input[name="group_name"]').val();
    	let group_leader = jQuery('#addGroupFrm').find('input[name="group_leader"]').val();
    	
		if (group_name == "") {
			jQuery('#addGroupFrm').find('input[name="group_name"]').focus();
			return;
		}

		// 그룹 추가 후 팝업 닫기
		add(group_name, group_leader)
		addPanel.fadeOut();
	});
    
    /*********************** 그룹참가 ***********************/
    // 팝업 영역 설정
	var joinPanel = jQuery(".joinGroup_popup");
	var joinPanelContents = joinPanel.find(".joinGroup_contents");
	
	// 그룹 참여 버튼 클릭시 그룹 참여 팝업 페이지 보여주기
	jQuery('#joinGroup').bind('click', function(e){
    	e.preventDefault();
         
    	popupOpen(joinPanel, joinPanelContents)
    });
	
	// 레이어 팝업 닫기
	popupClose(joinPanel);
	
	// 그룹 참가 버튼 클릭시
	jQuery(document).on("click", "#btn_joinGroup", function() {
		// 입력 받은 참가할 그룹번호 및 히든처리된 그룹원의 이메일을 변수처리
    	let group_no = jQuery('#joinGroupFrm').find('input[name="group_no"]').val();
    	let group_members = jQuery('#joinGroupFrm').find('input[name="group_members"]').val();
    	
		if (group_no == "") {
			jQuery('#joinGroupFrm').find('input[name="group_no"]').focus();
			return;
		}
		
		// 그룹 신청 및 팝업 페이지 닫기
		memberAdd(group_no, group_members)
		joinPanel.fadeOut();
	});
		
	/*********************** 그룹 Todo Detail ***********************/
	// 팝업 영역 셋팅
	var panel = jQuery(".pop_box");
    var panelContents = panel.find(".pop_contents");
    
    // 그룹 할일 클릭시
	jQuery(document).on('click','.center',function(){
		// 해당 그룹 할일의 id(그룹 할일의 그룹번호&순번)
		var tempStr = jQuery(this).attr('id');
		
		// 문자열 자르기로 그룹 번호와 순번을 나눔
		var strId = tempStr.split('&');
        
		popupOpen(panel, panelContents)

        // 레이어 팝업 열기
        panel.fadeIn();
        
        // 팝업에 세부정보 입력
        detail(strId[1], strId[0]);
    });
	
	// 레이어 팝업 닫기
	popupClose(joinPanel);
	
	/*********************** 그룹 Todo 수정 ***********************/
	// 수정하기 버튼 클릭시
	jQuery(document).on("click", "#btn_modify", function() {
		// 수정 여부 확인
		var modifyConfirm = confirm('수정하시겠습니까?');
		
		// 수정시
		if(modifyConfirm){
			// 입력 값 변수처리
			let no = jQuery('#modifyFrm').find('input[name="no"]').val();
			let group_no = jQuery('#modifyFrm').find('input[name="group_no"]').val();
			let title = jQuery('#modifyFrm').find('input[name="title"]').val();
			let content = jQuery('#modifyFrm').find('textarea[name="content"]').val();
			let start_reg = jQuery('#modifyFrm').find('input[name="start_reg"]').val();
			let finish_reg = jQuery('#modifyFrm').find('input[name="finish_reg"]').val();
			let priority = jQuery('#modifyFrm').find('input[name="priority"]').val();
			
			// 입력 값 입력 여부 확인
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
		
			// 수정 수행
			modify(no,group_no,title,content,start_reg,finish_reg, priority);
		}
	});
	
});

/*****************************************************************************************/
/* 그룹 리스트 */
function list(email){
	jQuery.ajax({
		type : 'post',						// post 방식
		url : 'groupList',					// 요청 url
		data : {							// 전달할 데이터
			'email' : email
		},
		dataType : 'json',					// 데이터 타입 json
		error : function(){					// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){			// ajax 통신 성공시
			jQuery('#contents').empty();
			
			// json으로 받은 데이터(그룹 리스트) 변수처리
			const list = json.data;
			
			let str = "";
			
			// 그룹 리스트 출력을 위한 부분
			jQuery(list).each(function(i, obj){
				str += "<div class='group_list'>";
				str += "<div class='groups'>";
				
				// 그룹 리스트 정보 출력 영역
				str += "<div class='groups_cont'>";
				str += "<p class='txt_groupNo'>그룹번호 : "+obj["group_no"]+"</p>";
				str += "<p class='txt_groupName'>그룹이름 : "+obj["group_name"]+"</p>";
				str += "<p class='txt_groupLeader'>그룹장 : "+obj["group_leader"]+"</p>";
				str += "</div>";
				
				// 버튼 영역
				str += "<div class='groups_option'>";
				str += "<button class='btn_opt' onClick=javascript:groupTodo('0','0','"+obj["group_no"]+"')>할일목록</button>"
				
				// 그룹장인 경우
				if(email == obj["group_leader"]){
					str += "<button class='btn_opt' onClick=javascript:groupExit(email,'"+obj["group_no"]+"')>그룹해제</button>"
					str += "<button class='btn_opt' onClick=javascript:groupManager('"+obj["group_no"]+"')>그룹관리</button>"
				// 그룹원인 경우
				}else{
					str += "<button class='btn_opt' onClick=javascript:groupExit(email,'"+obj["group_no"]+"')>그룹나가기</button>"
				}
				str += "</div>";
				
				str += "</div>";
				str += "</div>";
			});
			
			jQuery('#contents').append(str);
			
			/* Css 파일 읽기*/
			jQuery('<link rel="stylesheet" href="resources/css/groupListAjax.css" type="text/css" />').appendTo('head');
		}
	});
}

/* 그룹 생성 */
function add(group_name, group_leader){
	jQuery.ajax({
		type : 'post',							// post 방식
		url : 'addGroups',						// 요청 url
		data : {								// 전달할 데이터
			'group_name' : group_name,
			'group_leader' : group_leader
		},
		dataType : 'json',						// 데이터 타입 json
		async: false,							// ajax 동기화
		error : function(){						// ajax 통신 실패시
			alert("error");
			// 추후 error 페이지로 이동
		},
		success : function(){					// ajax 통신 성공시
			// 그룹 리스트를 추가된 내역까지 보여줌
			list(email);
		}
	});
}

/* 그룹원 추가 */
function memberAdd(group_no, group_members){
	jQuery.ajax({
		type : 'post',							// post 방식
		url : 'addGroupMember',					// 요청 url
		data : {								// 전달할 데이터
			'group_no' : group_no,
			'group_members' : group_members
		},
		dataType : 'json',						// 데이터 타입 json
		error : function(){						// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(){					// ajax 통신 성공시
			list(email);
		}
	});
}

/* 그룹관리 */
function groupManager(group_no){
	jQuery.ajax({
		type : 'post',						// post 방식
		url : 'groupManager',				// 요청 url
		data : {							// 전달할 데이터
			'group_no' : group_no
		},
		dataType : 'json',					// 데이터 타입 json
		error : function(){					// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){			// ajax 통신 성공시
			// 해당 보여줄 영역 초기화
			jQuery('#contents').empty();
			
			// json으로 받아온 데이터(해당 그룹의 그룹멤버 정보) 변수처리
			const list = json.data;
			
			let str = "";
			
			// 해당 영역에 출력을 위한 처리
			str += "<div class='member_div'>";
			str += "<table class='group_table'>";
			str += "<caption>그룹번호 : "+json.group_no+"</caption>";
			str += "<tr><td class='tb_user'>그룹원 이메일</td><td class='tb_status'>그룹원 상태</td><td class='tb_management'>그룹 관리</td></tr>";
			
			// 받아온 데이터가 없는 경우
			if(jQuery(list).length == 0){
				str += "<tr><td colspan='3'>그룹원이 없습니다.</td></tr>";
			}
			
			// 받아온 데이터가 있는 경우
			jQuery(list).each(function(i, obj){
				// 그룹원의 상태  0 : 그룹 신청
				if(obj["group_status"] == 0){
					str += "<tr><td>"+obj["group_members"]+"</td><td>그룹신청</td>";
					str += "<td><button class='tb_btn' onClick=javascript:groupMemberManager('"+obj["group_no"]+"','"+obj["group_members"]+"',true)>승낙</button>/";
					str += "<button class='tb_btn' onClick=javascript:groupMemberManager('"+obj["group_no"]+"','"+obj["group_members"]+"',false)>거절</button></td></tr>";
				// 그룹원의 상태  1 : 그룹원
				}else if(obj["group_status"] == 1){
					str += "<tr><td>"+obj["group_members"]+"</td><td>그룹원</td>";
					str += "<td><button class='tb_btn' onClick=javascript:groupMemberManager('"+obj["group_no"]+"','"+obj["group_members"]+"',false)>추방하기</button>/";
					str += "<button class='tb_btn' onClick=javascript:changeGroupLeader('"+obj["group_no"]+"','"+obj["group_members"]+"')>그룹장 위임</button></td></tr>";
				// 그룹원의 상태  -1 : 신청 거절 및 추방
				}else if(obj["group_status"] == -1){
					str += "<tr><td>"+obj["group_members"]+"</td><td>거절됨</td><td id='reject'>삭제</td></tr>";
				}
			});
			str += "</table>";
			str += "</div>";
			
			jQuery('#contents').append(str);
			
			/* Css 파일 읽기*/
			jQuery('<link rel="stylesheet" href="resources/css/groupManagerList.css" type="text/css" />').appendTo('head');
		}
	});
}

/* 그룹 멤버 관리  */
function groupMemberManager(group_no, group_members, isOk){
	jQuery.ajax({
		type : 'post',							// post 방식
		url : 'groupMemberManager',				// 요청 url
		data : {								// 전달할 데이터
			'group_no' : group_no,
			'group_members' : group_members,
			'isOk' : isOk
		},
		dataType : 'json',						// 데이터 타입 json
		error : function(){						// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(){					// ajax 통신 성공시
			// 그룹관리 페이지 리로딩
			groupManager(group_no)
		}
	});
}

/* 그룹장 위임 */
function changeGroupLeader(group_no, group_leader){
	jQuery.ajax({
		type : 'post',							// post 방식
		url : 'updateGroupLeader',				// 요청 url
		data : {								// 전달할 데이터
			'group_no' : group_no,
			'group_leader' : group_leader
		},
		dataType : 'json',						// 데이터 타입 json
		error : function(){						// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(){					// ajax 통신 성공시
			// 그룹 리스트로 이동 (그룹장이 아니면 그룹관리 페이지 접근 불가)
			list(email);
		}
	});
}

//그룹 나가기
function groupExit(email, group_no){
	// 그룹 나가기 확인 작업
	var exitConfirm = confirm('정말로 그룹을 해제하시겠습니까?');
	
	// 그룹 나가기 수행하는 경우
	if(exitConfirm){
		jQuery.ajax({
			type : 'post',				// post 방식
			url : 'groupExit',			// 요청 url
			data : {					// 전달할 데이터
				'email' : email,
				'group_no' : group_no
			},
			dataType : 'json',			// 데이터 타입 json
			error : function(){			// ajax 통신 실패시
				//alert("error");
				window.location.href = 'error';
			},
			success : function(){		// ajax 통신 성공시
				// 그룹 리스트 이동
				list(email);
			}
		});
	}
}

/* 그룹 할일 */
function groupTodo(status, no, group_no){
	jQuery.ajax({
		type : 'post',					// post 방식
		url : 'groupTodo',				// 요청 url
		data : {						// 전달할 데이터
			'group_no' : group_no,
			'status' : status,
			'no' : no
		},
		dataType : 'json',				// 데이터 타입 json
		error : function(){				// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){		// ajax 통신 성공시
			// 그룹 할일 정보를 json으로 받아서 변수처리
			const list = json.data;
			
			//버튼 텍스트 변경, 클릭이벤트 변경
			jQuery('#contents').empty();
			jQuery('#addGroup').unbind('click');
			jQuery('#addGroup').html("일정추가하기");
			jQuery('#joinGroup').css('display', 'none');
			
			// 일정추가하기 버튼 클릭시
			jQuery('#addGroup').click(function(e){
				e.preventDefault();
				
				// 팝업 영역 변수처리
				var panel = jQuery(".pop_box");
		        var panelContents = panel.find(".pop_contents");
		             
				// 팝업 가운데 설정을 위한 가로 셋팅
				if (panelContents.outerWidth() < jQuery(document).width()) {
		            panelContents.css("margin-left", "-" + panelContents.outerWidth() / 2 + "px");
		        } else {
		            panelContents.css("left", "0px");
		        }

		        // 팝업 가운데 설정을 위한 세로 셋팅
		        if (panelContents.outerHeight() < jQuery(document).height()) {
		            panelContents.css("margin-top", "-" + panelContents.outerHeight() / 2 + "px");
		        } else {
		            panelContents.css("top", "0px");
		        }

		        // 레이어 팝업 열기
		        panel.fadeIn();
		        
		        // ajax를 통한 팝업에 값 입력
		        addGroupTodoPage(json.group_no);

		    	// 팝업 닫기 이벤트 정의
		    	jQuery(document).on("click", "#btn_cancel",popupClose);
		    	jQuery(document).on("click", "#btn_cancel2",popupClose);

		        // 팝업 배경 클릭 이벤트 정의
		        panel.find(".pop_bg").on("click", popupClose);
		        
		        function popupClose(e) { 
		            panel.fadeOut(); 
		            // 이벤트 기본 동작 중단
		            e.preventDefault();
		        }
			});
			
			// 할일 영역 나누기
			let str = "";
			str += '<section class="cont">';
			str += '<div class="todo_header">Todo</div>';
			str += '<div id="todo_cont" class="todo_content"></div>';
			str += '</section>';
			str += '<section class="cont">';
			str += '<div class="todo_header">Do</div>';
			str += '<div id="do_cont" class="todo_content"></div>';
			str += '</section>';
			str += '<section class="cont">'
			str += '<div class="todo_header">Done</div>';
			str += '<div id="done_cont" class="todo_content"></div>';
			str += '</section>';

			jQuery('#contents').append(str);

			// 각 영역에 나누어 입력을 위한 변수값 처리
			let todoStr = "";
			let doStr = "";
			let doneStr = "";

			// json으로 받은 그룹장 정보 변수처리
			let leader_name = json.group_leader;
			
			// 각 영역에 보여줄 정보 처리
			jQuery(list).each(function(i, obj){
				// Todo
				if(obj.status == 1){
					todoStr += "<div class='todo'>";
					
					// 이전 상태 버튼 영역 (Todo의 이전 상태는 없기 때문에 hidden 처리)
					todoStr += "<div class = 'prev'>";
					todoStr += "<button class='btn_prev' style='visibility: hidden;'><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></button>";
					todoStr += "</div>";
					
					// 실제 데이터 영역 (해당 div의 id는 할일 순번, 제목과 시작과 종료 날짜만 출력)
					todoStr += "<div class ='center' id='"+obj["no"]+"&"+obj["group_no"]+"'>";
					todoStr += "<p class='title'>"+obj["title"]+"</p><br>";
					todoStr += "<p class='reg'>"+obj["start_reg"]+"&nbsp;~&nbsp;"+obj["finish_reg"]+"</p><br>"
					todoStr += "</div>";
					
					// 다음 상태 버튼 및 삭제 버튼 영역
					todoStr += "<div class = 'next'>";
					// 삭제 버튼은 해당 사용자가 그룹장인 경우에만 보여짐
					if(email == leader_name)
						todoStr += "<button class='delete' onClick=javascript:del('"+obj["no"]+"','"+obj["group_no"]+ "')><i class='fa fa-times-circle' aria-hidden='true'></i></button>";
					else
						todoStr += "<button class='delete' style='visibility: hidden;' onClick=javascript:del('"+obj["no"]+"','"+obj["group_no"]+ "')><i class='fa fa-times-circle' aria-hidden='true'></i></button>";
					todoStr += "<button class='btn_next' onClick=javascript:groupTodo('2','"+obj["no"]+"','"+obj["group_no"]+ "')><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></button>";
					todoStr += "</div>";
					
					todoStr += "</div>";
				// Do
				}else if(obj.status == 2){
					doStr += "<div class='todo'>";
					
					// 이전 상태 버튼 영역
					doStr += "<div class = 'prev'>";
					doStr += "<button class='btn_prev' onClick=javascript:groupTodo('1','"+obj["no"]+"','"+obj["group_no"]+"')><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></button>";
					doStr += "</div>";
					
					// 실제 데이터 영역 (해당 div의 id는 할일 순번, 제목과 시작과 종료 날짜만 출력)
					doStr += "<div class ='center' id='"+obj["no"]+"&"+obj["group_no"]+"'>";
					doStr += "<p class='title'>"+obj["title"]+"</p><br>";
					doStr += "<p class='reg'>"+obj["start_reg"]+"&nbsp;~&nbsp;"+obj["finish_reg"]+"</p><br>"
					doStr += "</div>";
					
					// 다음 상태 버튼 및 삭제 버튼 영역
					doStr += "<div class = 'next'>";
					// 삭제 버튼은 해당 사용자가 그룹장인 경우에만 보여짐
					if(email == leader_name)
						doStr += "<button class='delete' onClick=javascript:del('"+obj["no"]+"','"+obj["group_no"]+ "')><i class='fa fa-times-circle' aria-hidden='true'></i></button>";
					else
						todoStr += "<button class='delete' style='visibility: hidden;' onClick=javascript:del('"+obj["no"]+"','"+obj["group_no"]+ "')><i class='fa fa-times-circle' aria-hidden='true'></i></button>";
					doStr += "<button class='btn_next' onClick=javascript:groupTodo('3','"+obj["no"]+"','"+obj["group_no"]+"')><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></button>";
					doStr += "</div>";
					
					doStr += "</div>";
				// Done
				}else if(obj.status == 3){
					doneStr += "<div class='todo'>";
					
					// 이전 상태 버튼 영역
					doneStr += "<div class = 'prev'>";
					doneStr += "<button class='btn_prev' onClick=javascript:groupTodo('2','"+obj["no"]+"','"+obj["group_no"]+"')><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></button>";
					doneStr += "</div>";
					
					// 실제 데이터 영역 (해당 div의 id는 할일 순번, 제목과 시작과 종료 날짜만 출력)
					doneStr += "<div class ='center' id='"+obj["no"]+"&"+obj["group_no"]+"'>";
					doneStr += "<p class='title'>"+obj["title"]+"</p><br>";
					doneStr += "<p class='reg'>"+obj["start_reg"]+"&nbsp;~&nbsp;"+obj["finish_reg"]+"</p><br>"
					doneStr += "</div>";
					
					// 다음 상태 버튼 및 삭제 버튼 영역 (다음 상태 버튼은 Done의 경우 없기 때문에 hidden 처리)
					doneStr += "<div class = 'next'>";
					// 삭제 버튼은 해당 사용자가 그룹장인 경우에만 보여짐
					if(email == leader_name)
						doneStr += "<button class='delete' onClick=javascript:del('"+obj["no"]+"','"+obj["group_no"]+ "')><i class='fa fa-times-circle' aria-hidden='true'></i></button>";
					doneStr += "<button class='btn_next' style='visibility: hidden;'><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></button>";
					doneStr += "</div>";
					
					doneStr += "</div>";
				}
			});
			
			// 각각의 영역에 해당 데이터 입력
			jQuery('#todo_cont').append(todoStr);
			jQuery('#do_cont').append(doStr);
			jQuery('#done_cont').append(doneStr);
			
			/* Css 파일 읽기*/
			jQuery('<link rel="stylesheet" href="resources/css/memo.css" type="text/css" />').appendTo('head');
		}
	});
}

/* 할일 데이터 추가 페이지로 이동*/
function addGroupTodoPage(group_no){
	jQuery.ajax({
		type : 'get',					// get 방식
		url : 'addGroupTodoPage',		// 요청 Url
		data: {							// 전달할 데이터
			'group_no':group_no
		},
		dataType : 'json',				// 데이터 타입 json
		error : function(){				// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){		// ajax 통신 성공시
			// 기존의 데이터 비우기
			jQuery('.pop_contents').empty();
			
			// json으로 해당 그룹의 번호를 받아와서 변수처리 (히든처리해서 같이 넘길예정)
			let group_no = json.data;
			
			// 입력 폼 형식으로 팝업 영역에 데이터 입력 처리
			let popupStr = '';
			popupStr += "<form action='add' id='addFrm' method='post' onsubmit='return false;'>"
			popupStr += "<input type='hidden' id='group_no' name='group_no' value='"+group_no+"'>";
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
			
			// jQuery에서 제공하는 입력폼 클릭시 달력 표시
			jQuery(document).find("input[name=start_reg]").datepicker({
				minDate : 0, 																		//  현재 날짜 이전은 선택 불가하게 설정
				changeMonth: true, 																	// 월을 바꿀수 있는 셀렉트 박스를 표시한다.
				changeYear: true, 																	// 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
				dayNamesMin:["일","월","화","수","목","금","토"], 										// 요일에 표시되는 형식 설정
		        dateFormat:"yy-mm-dd", 																//날짜 형식 설정
		        monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], 	//월표시 형식 설정
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
			    monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],	//월표시 형식 설정
			    onClose : function(selectedDate) {
					// 종료일(toDate) datepicker가 닫힐때
					// 시작일(fromDate)의 선택할수있는 최대 날짜(maxDate)를 선택한 종료일로 지정 
					$("#start_reg").datepicker("option", "maxDate", selectedDate);
				}
			});
			
			// 추가 버튼 클릭시
			jQuery(document).on('click', '#btn_add', function(){
				// 추가 확인
				var addConfirm = confirm('추가하시겠습니까?');
				
				// 추가시
				if(addConfirm){
					// 각 입력폼 객체 변수처리
					let group_no = jQuery('#addFrm').find('input[name="group_no"]').val();
			    	let title = jQuery('#addFrm').find('input[name="title"]').val();
			    	let content = jQuery('#addFrm').find('textarea[name="content"]').val();
			    	let start_reg = jQuery('#addFrm').find('input[name="start_reg"]').val();
			    	let finish_reg = jQuery('#addFrm').find('input[name="finish_reg"]').val();
			    	let priority = jQuery('#addFrm').find('input[name="priority"]').val();
					
			    	// 각 입력폼에 내용이 빈 경우 포커스 해준뒤 추가 수행x
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
			
					// 그룹 할일 추가
					addGroupTodo(group_no, title, content, start_reg, finish_reg, priority);
				}
			});
			
			jQuery('<link rel="stylesheet" href="resources/css/addTodo.css" type="text/css" />').appendTo('head');
		}
	});
}

/* 그룹 할일 추가 */
function addGroupTodo(group_no,title,content,start_reg,finish_reg,priority) {
	jQuery.ajax({
		type : 'post',					// post 방식
		url : 'addGroupTodo',			// 요청 url
		data: {							// 전달할 데이터
			'group_no':group_no,
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
			// 그룹 할일 페이지 리로딩 후 팝업 닫기
			groupTodo("0","0", group_no);
			jQuery(".pop_box").fadeOut();
		}
	});
}

/* 그룹할일 세부내용 팝업 페이지 */
function detail(group_no, no){
	jQuery.ajax({
		type : 'get',					// get 방식
		url : 'groupTodoDetail',		// 요청 urol
		data : {						// 전달할 데이터
			'no':no,
			'group_no':group_no
		},
		dataType : 'json',				// 데이터 타입 json
		error : function(){				// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){		// ajax 통신 성공시
			// 기존 데이터 비우기
			jQuery('.pop_contents').empty();
			
			// json으로 받아온 세부 데이터 정보 변수처리
			const list = json.data;

			// 각 형식에 맞게 화면에 표시
			let popupStr = '';
			// 데이터 출력 영역
			popupStr += "<div class='div_cont' id='"+list["no"]+"'>";
			popupStr += "<p class='title'>제목 : "+list["title"]+"</p>";
			popupStr += "<p class='content'>내용 : "+list["content"]+"</p>";
			popupStr += "<p class='reg'>기간 : "+list["start_reg"]+"&nbsp;~&nbsp;"+list["finish_reg"]+"</p>";
			popupStr += "<p class='priority'>우선순위 : "+list["priority"]+"</p>";
			popupStr += "</div>";

			// 버튼 영역
			popupStr += "<div class='div_btn'>";
			popupStr += "<button id='btn_modifyPage' class='pop_btn' onClick=javascript:modifyPage('"+list["group_no"]+"','"+list["no"]+"')>수정페이지</button>";
			popupStr += "<button id='btn_cancel' class='pop_btn'>취소</button>";
			popupStr += "</div>";
			
			jQuery('.pop_contents').append(popupStr);
			jQuery('<link rel="stylesheet" href="resources/css/popup.css" type="text/css" />').appendTo('head');
		}
	});
}

/* 그룹 할일 수정 페이지로 이동 */
function modifyPage(group_no, no){
	jQuery.ajax({
		type : 'get',						// get 방식
		url : 'groupTodoModifyPage',		// 요청 url
		data : {							// 전달할 데이터
			'no':no,
			'group_no':group_no
		},
		dataType : 'json',					// 데이터 타입 json
		error : function(){					// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){			// ajax 통신 성공시
			// 기존의 데이터 비우기
			jQuery('.pop_contents').empty();
			
			// json으로 수정할 할일 데이터 받아와서 변수처리
			const list = json.data;
			
			// 입력폼에 기존의 할일 정보 입력
			let popupStr = '';
			
			// 입력 폼 영역 (기존의 정보 표시)
			popupStr += "<form action='modify' id='modifyFrm' method='post' onsubmit='return false;'>"
			popupStr += "<input type='hidden' id='no' name='no' value='"+list["no"]+"'>";
			popupStr += "<input type='hidden' id='group_no' name='group_no' value='"+list["group_no"]+"''>";
			popupStr += "<div class='div_cont'>";
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='title' name='title' placeholder='제목을 입력해주세요.' value='"+list["title"]+"' autocomplete='off'><br>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<textarea id='content' name='content' placeholder='내용을 입력해주세요.'>"+list["content"]+"</textarea><br>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='start_reg' name='start_reg' placeholder='시작날짜를 입력해주세요.' value='"+list["start_reg"]+"' autocomplete='off'>";
			popupStr += "&nbsp;&nbsp;~&nbsp;&nbsp;"
			popupStr += "<input type='text' id='finish_reg' name='finish_reg' placeholder='종료날짜를 입력해주세요.' value='"+list["finish_reg"]+"' autocomplete='off'>";
			popupStr += "</div>";
			
			popupStr += "<div class='textbox'>";
			popupStr += "<input type='text' id='priority' name='priority' placeholder='우선순쉬를 입력해주세요.' value='"+list["priority"]+"' autocomplete='off'><br>";
			popupStr += "</div>";
			popupStr += "</div>";

			// 버튼 영역
			popupStr += "<div class='div_btn'>";
			popupStr += "<button id='btn_modify' class='pop_btn'>수정하기</button>";
			popupStr += "<button id='btn_back' class='pop_btn' onClick=javascript:detail('"+list["group_no"]+"','"+list["no"]+"')>취소</button>";
			popupStr += "</div>";
			popupStr += "</form>";
			
			jQuery('.pop_contents').append(popupStr);
			
			// jQuery에서 제공하는 입력폼 클릭시 달력 표기
			jQuery(document).find("input[name=start_reg]").datepicker({
				minDate : 0, 																			//  현재 날짜 이전은 선택 불가하게 설정
				changeMonth: true, 																		// 월을 바꿀수 있는 셀렉트 박스를 표시한다.
				changeYear: true, 																		// 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
				dayNamesMin:["일","월","화","수","목","금","토"], 											// 요일에 표시되는 형식 설정
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
			    dateFormat:"yy-mm-dd", 																	//날짜 형식 설정
			    monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], 		//월표시 형식 설정
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

/* 그룹 할일 수정 */
function modify(no,group_no,title,content,start_reg,finish_reg,priority){
	jQuery.ajax({
		type : 'post',						// post 방식
		url : 'groupTodoModify',			// 요청 url
		data : {							// 전달할 데이터
			'no':no,
			'group_no':group_no,
			'title':title,
			'content':content,
			'start_reg':start_reg,
			'finish_reg':finish_reg,
			'priority':priority
		},
		dataType : 'json',					// 데이터 타입 json
		error : function(){					// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){			// ajax 통신 성공시
			const list = json.data;
			
			// 할일 수정 성공시
			if(list.check){
				// 그룹 할일 페이지 리로딩 및 팝업 페이지 닫기
				groupTodo("0","0", group_no);
				$(".pop_box").fadeOut();
			// 할일 수정 실패시
			}else{
				alert("error");
				// 이후 오류 페이지로 이동
			}
		}
	});
}

/* 그룹 할일 데이터 삭제 */
function del(no, group_no){
	jQuery.ajax({
		type : 'post',					// post 방식
		url : 'groupTododelete',		// 요청 url
		data : {						// 전달할 데이터
			'no' : no
		},
		dataType : 'json',				// 데이터 타입 json
		error : function(){				// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){		// ajax 통신 성공시
			const list = json.data;

			// 할일 삭제 성공시
			if(list.check){
				// 그룹 할일 페이지 리로딩 및 팝업 페이지 닫기
				groupTodo("0", "0", group_no);
				jQuery(".pop_box").fadeOut();
			// 할일 삭제 실패시
			}else{
				alert("error");
				// 이후 오류 페이지로 이동
			}
		}
	});
}

/* 팝업 열기 */
function popupOpen(panel, panelContents){
	// 팝업 가운데 설정을 위한 가로 셋팅
	if (panelContents.outerWidth() < jQuery(document).width()) {
        panelContents.css("margin-left", "-" + panelContents.outerWidth() / 2 + "px");
    } else {
        panelContents.css("left", "0px");
    }

    // 팝업 가운데 설정을 위한 세로 셋팅
    if (panelContents.outerHeight() < jQuery(document).height()) {
        panelContents.css("margin-top", "-" + panelContents.outerHeight() / 2 + "px");
    } else {
        panelContents.css("top", "0px");
    }

    // 레이어 팝업 열기
    panel.fadeIn();
}

/* 팝업 닫기 */
function popupClose(panel){
	 // 닫기 버튼 클릭 및 레이어 영역 클릭시 팝업 감추기
    jQuery(document).on("click", "#addGroup_cancel", close);
    panel.find(".pop_bg").on("click", close);
    
    // 팝업 닫기 함수
    function close(e) {
    	// 팝업 감추기
    	panel.fadeOut(); 
	    // 이벤트 기본 동작 중단
	    e.preventDefault();
	}
}
