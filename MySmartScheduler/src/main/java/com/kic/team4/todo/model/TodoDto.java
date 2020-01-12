package com.kic.team4.todo.model;

public class TodoDto {
	private String no,email,title,start_reg,finish_reg,priority,status,content;

	// 순번
	public String getNo() {return no;}
	public void setNo(String no) {this.no = no;}

	// 유저 이메일
	public String getEmail() {return email;}
	public void setEmail(String email) {this.email = email;}

	// 제목
	public String getTitle() {return title;}
	public void setTitle(String title) {this.title = title;}

	// 내용
	public String getContent() {return content;}
	public void setContent(String content) {this.content = content;}
	
	// 시작 날짜
	public String getStart_reg() {return start_reg;}
	public void setStart_reg(String start_reg) {this.start_reg = start_reg;}

	// 끝 날짜
	public String getFinish_reg() {return finish_reg;}
	public void setFinish_reg(String finish_reg) {this.finish_reg = finish_reg;}

	// 우선순위
	public String getPriority() {return priority;}
	public void setPriority(String priority) {this.priority = priority;}

	// 상태 (Todo, doing, done)
	public String getStatus() {return status;}
	public void setStatus(String status) {this.status = status;}
}
