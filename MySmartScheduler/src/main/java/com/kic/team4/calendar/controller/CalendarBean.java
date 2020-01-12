package com.kic.team4.calendar.controller;

public class CalendarBean {
	private String no,email,title,start,finish,priority,status,content,count;

	// 순번
	public String getNo() {return no;}
	public void setNo(String no) {this.no = no;}

	// 접속자 email
	public String getEmail() {return email;}
	public void setEmail(String email) {this.email = email;}

	// Todo 제목
	public String getTitle() {return title;}
	public void setTitle(String title) {this.title = title;}

	// 시작일
	public String getStart() {return start;}
	public void setStart(String start) {this.start = start;}

	// 종료일
	public String getFinish() {return finish;}
	public void setFinish(String finish) {this.finish = finish;}

	// 우선순위
	public String getPriority() {return priority;}
	public void setPriority(String priority) {this.priority = priority;}

	// 상태
	public String getStatus() {return status;}
	public void setStatus(String status) {this.status = status;}

	// 내용
	public String getContent() {return content;}
	public void setContent(String content) {this.content = content;}

	// 월에 존재하는 Todo의 갯수
	public String getCount() {return count;}
	public void setCount(String count) {this.count = count;}
}
