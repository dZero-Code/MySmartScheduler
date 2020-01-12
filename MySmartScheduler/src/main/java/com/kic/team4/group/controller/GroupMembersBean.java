package com.kic.team4.group.controller;

public class GroupMembersBean {
	private String no, group_no, group_members, group_status;
	
	/* 순번 */
	public String getNo() {return no;}
	public void setNo(String no) {this.no = no;}

	/* 그룹번호 */
	public String getGroup_no() {return group_no;}
	public void setGroup_no(String group_no) {this.group_no = group_no;}

	/* 그룹의 멤버들 */
	public String getGroup_members() {return group_members;}
	public void setGroup_members(String group_members) {this.group_members = group_members;}
	
	/* 그룹멤버의 상태 (0: 회원가입신청, 1: 회원, -1 : 추방 및 거절) */
	public String getGroup_status() {return group_status;}
	public void setGroup_status(String group_status) {this.group_status = group_status;}
}
