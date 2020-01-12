package com.kic.team4.todo.controller;

public class TodoBean {
	private String no,email,title,content,start_reg,finish_reg,priority,chk;

	// 할일의 순번
	public String getNo() {return no;}
	public void setNo(String no) {this.no = no;}

	// 사용자 이메일
	public String getEmail() {return email;}
	public void setEmail(String email) {this.email = email;}

	// 할일 제목
	public String getTitle() {return title;}
	public void setTitle(String title) {this.title = title;}
	
	// 할일의 내용
	public String getContent() {return content;}
	public void setContent(String content) {this.content = content;}

	// 할일의 시작일
	public String getStart_reg() {return start_reg;}
	public void setStart_reg(String start_reg) {this.start_reg = start_reg;}

	// 할일의 종료일
	public String getFinish_reg() {return finish_reg;}
	public void setFinish_reg(String finish_reg) {this.finish_reg = finish_reg;}

	// 할일의 우선순위
	public String getPriority() {return priority;}
	public void setPriority(String priority) {this.priority = priority;}

	// 할일의 상태
	public String getChk() {return chk;}
	public void setChk(String chk) {this.chk = chk;}
}
