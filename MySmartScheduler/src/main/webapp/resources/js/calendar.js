jQuery(document).ready(function(){
	// 현재 날짜 계산
	var date = new Date();
	var reg = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
	
	// 캘랜더 생성
	create(email, reg);
	
	// 캘랜더의 표시된 할일 클릭시 세부 내용 보기
	jQuery(document).on("click ","td[class='calendarChk']",function(event){
		// 캘린더 표시 할일 세부보기
		calendarDetail(email, jQuery(this).attr("id"));
		
		// 클릭한 객체
		var obj = jQuery(this);
		
		// 세부정보를 표시할 위치 설정
		divTop = obj.offset().top + obj.height() / 2 - 10;
		divLeft = obj.offset().left + obj.width() + 10;
		
		// 해당 위치에 세부내용을 보여주기
		jQuery('#calendarDetail').css({
		    "top": divTop
		    ,"left": divLeft
		    , "position": "absolute"
		}).show();
		
		event.stopPropagation();
	});
	
	// 세부내용 보기의 닫기버튼 클릭시 세부내용을 감추기
	jQuery(document).on("click", "#detailClose", function(){
		//alert('닫기');
		jQuery('#calendarDetail').css({
			"display": "none"
		});
	});
	
	// 캘린더의 이전달 버튼 클릭시 
	jQuery(document).on("click ","button[id='regBack']",function(event){
		// 현재 날짜 받아오기
		var tempReg = jQuery('#preNofrm').find('input[name="tempReg"]').val();
		var dayOf = tempReg.split("-");
		
		// 현재달 -1
		dayOf[1] = parseInt(dayOf[1])-1;
		
		// 10보다 적은 경우 01, 02, 03 형식으로 표기
		if(dayOf[1] < 10 && dayOf[1] != 0){
			dayOf[1] = "0"+dayOf[1];
		
		// -1 한경우 0월이 되는경우 작년 12월로 변경
		} else if(dayOf[1] == 0){
			dayOf[0] = parseInt(dayOf[0])-1;
			dayOf[1] = "12";
		}
		
		// 현재 날짜를 보여주는 입력창 수정
		tempReg = dayOf[0]+"-"+dayOf[1];
		
		// 캘린더 새로 생성
		create(email,tempReg);
		event.stopPropagation();
	});
	
	// 캘린더의 다음달 버튼 클릭시 
	jQuery(document).on("click ","button[id='regFront']",function(event){
		// 현재 날짜 받아오기
		var tempReg = jQuery('#preNofrm').find('input[name="tempReg"]').val();
		var dayOf = tempReg.split("-");
		
		// 현재달 +1
		dayOf[1] = parseInt(dayOf[1])+1;
		
		// +1 한 경우 10보다 작고 13이 아닌 경우 01, 02, 03 형식으로 표기
		if(dayOf[1] < 10 && dayOf[1] != 13){
			dayOf[1] = "0"+dayOf[1];
		// +1 한 경우 13월이 되는 경우 다음년도 1월로 변경
		} else if(dayOf[1] == 13){
			dayOf[0] = parseInt(dayOf[0])+1;
			dayOf[1] = "01";
		}
		
		// 현재 날짜를 보여주는 입력창 수정
		tempReg = dayOf[0]+"-"+dayOf[1];
		
		// 캘린더 새로 생성
		create(email,tempReg);
		event.stopPropagation();
	});
});

/*****************************************************************************************/
/* 캘린더 생성을 위한 함수 */
function create(email, reg) {
	// 날짜값(년도-월)을 받아와 - 형식으로 잘라서 각각의 변수에 저장
	var dayday = reg;
	var dayOf = dayday.split("-");
	reg = dayOf[0]+"-"+dayOf[1];
	
	// 캘린더 생성을 위한 ajax 접근
	jQuery.ajax({
		type : 'post',			// post 방식
		url : 'calendar',		// 접근할 url
		dataType : 'json',		// 데이터 타입 json
		data: {					// 전달할 데이터값
			'email':email,
			'reg':reg
		},
		error : function(){		// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){	// ajax 통신 성공시
			// 이전 값을 지우고 새로 보여줄 영역 비우기
			jQuery('#contents').empty();
			
			// 해당 년도 월 셋팅하여 보여주기
			jQuery('#preNofrm').find('input[name="tempReg"]').val(reg);
			
			// 화면에 보여줄 값 기본 셋팅 부분 (div 영역 잡고 그안에 비우기)
			var strMain = "";
			strMain += "<div id='calendar'></div>";
			strMain += "<div id='calendarDetail'></div>";
			jQuery("#contents").append(strMain);
			
			jQuery("#calendar").empty();
			jQuery("#calendarDetail").empty();
			
			// json으로 해당월의 존재하는 할일 리스트 받아오기
			var list = json.data;
			
			// 해당 월의 일수
			var MaxDay = ( new Date( dayOf[0], dayOf[1], 0) ).getDate()
			
			// 해당 월의 1일의 요일 (0~6)
			var today = new Date(dayOf[0]+"-"+dayOf[1]+"-1").getDay();
			
			// 배열 생성 
			var arrayDay = new Array(MaxDay);
			
			// 배열 초기화
			for (var i = 0; i < MaxDay; i++) {
				arrayDay[i] = null;
			}
			
			// 날짜 배열에 해당 날짜에 할일 타이틀 저장
			jQuery(list).each(function(i,obj){
				if(obj["count"] > 1)
					arrayDay[obj["finish"] - 1] = obj["title"] + "<br>그 외 " + (obj["count"]-1) + "개";
				else
					arrayDay[obj["finish"] - 1] = obj["title"];
			});
			
			// 캘린더를 테이블 형식으로 화면에 표시
			var str = "<table class='tb_date'>";
			str += "<tr>";
			str += "<td><button id='regBack' class='btn_calendar'><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></button></td>";
			str += "<td>"+reg+"</td>";
			str += "<td><button id='regFront' class='btn_calendar'><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></button></td>";
			str += "</tr>";
			str += "</table>";
			str+="<table class='tb_calendar'>";
			str+="<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr>";

			// 뒷 공백 체크 (table의 tr 갯수를 채우기 위해 설정 필요)
			if((MaxDay+today)%7 == 0){
				var calMax = 0;
			} else {
				var calMax = 7-(MaxDay+today)%7;
			}
			 
			// for문 : -> 앞 공백(today) + 총날짜(MaxDay) + 뒷 공백(calMax)
			for (var i = 0; i < MaxDay+today+calMax; i++) {
				// 일요일 : 달력 각 줄의  첫번째 칸
				if(i%7 == 0) {
					str +="<tr>";
				}
				
				if(today > i || MaxDay < i-today+1){
					// 공백부분
					str+="<td>";
					str+="<div></div>";
					str+="<div></div>";
					str+="</td>";
				} else{
					// 날짜부분
					if(arrayDay[i-today] != null){
						// 메모가 있는 날짜 칸은 실제 수행
						str+="<td class='calendarChk' id='"+reg+"-"+(i-today+1)+"'>";
						str+="<div class='tb_day'>"+(i-today+1)+"</div>";
						str+="<div class='tb_todo'>"+arrayDay[i-today]+"</div>";
						str+="</td>";
					} else{
						// 메모가 없는 날짜 칸은 공백 처리
						str+="<td>";
						str+="<div class='tb_day'>"+(i-today+1)+"</div>";
						str+= "<div></div>";
						str+="</td>";
					} 
				 }
				 
				// 토요일 : 달력 각 줄의  마지막 칸
		         if(i%7==6){
		        	 str +="</tr>";
		         }
		     }
			 str+='</table>';
			 jQuery("#calendar").append(str);
		}
	});
}

function calendarDetail(email, reg) { 	// 캘린더에 표시된 할일의 세부 정보
	jQuery.ajax({
		type : 'post',				// post 방식
		url : 'calendarDetail',		// 요청할 url
		dataType : 'json',			// 데이터 타입 json
		data: {						// 전달할 데이터
			'email':email,
			'reg':reg
		},
		error : function(){			// ajax 통신 실패시
			//alert("error");
			window.location.href = 'error';
		},
		success : function(json){	// ajax 통신 성공시
			// 기존의 calendar 세부정보 지우기 
			jQuery("#calendarDetail").empty();
			
			// json으로 받아온 데이터
			var list = json.data;
			
			// 해당 영역에 calendar의 세부정보를 입력
			var str = "";
			jQuery(list).each(function(i,obj){
				str += "<table>";
				str += "<tr><td> 제목 : "+obj["title"]+"</td></tr>";
				str += "<tr><td> 내용 : "+obj["content"]+"</td></tr>";
				str += "<tr><td> 날짜 : "+obj["start"]+" - "+obj["finish"]+"</td></tr>";
				str += "<tr><td> 우선순위 : "+obj["priority"]+"</td></tr>";
				str += "</table><br>";
			});
			str += "<span id='detailClose'>닫기</span>";
							
			jQuery("#calendarDetail").append(str);
		}
	});
}