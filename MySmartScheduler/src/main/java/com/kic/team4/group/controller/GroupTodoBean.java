package com.kic.team4.group.controller;

public class GroupTodoBean {
	private String no, group_no, title, content, start_reg, finish_reg, priority, status;

	/* 순번 */
	public String getNo() {return no;}
	public void setNo(String no) {this.no = no;}

	/* 그룹번호 */
	public String getGroup_no() {return group_no;}
	public void setGroup_no(String group_no) {this.group_no = group_no;}

	/* 제목 */
	public String getTitle() {return title;}
	public void setTitle(String title) {this.title = title;}
	
	/* 내용 */
	public String getContent() {return content;}
	public void setContent(String content) {this.content = content;}
	
	/* 시작일 */
	public String getStart_reg() {return start_reg;}
	public void setStart_reg(String start_reg) {this.start_reg = start_reg;}

	/* 종료일 */
	public String getFinish_reg() {return finish_reg;}
	public void setFinish_reg(String finish_reg) {this.finish_reg = finish_reg;}

	/* 우선순위 */
	public String getPriority() {return priority;}
	public void setPriority(String priority) {this.priority = priority;}

	/* 상태 */
	public String getStatus() {return status;}
	public void setStatus(String status) {this.status = status;}
	
}
