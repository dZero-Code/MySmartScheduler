package com.kic.team4.group.model;

/* 그룹현황 Dto */
public class GroupDto {
	private String group_no, group_name, group_leader;

	/* 그룹 번호 */
	public String getGroup_no() {return group_no;}
	public void setGroup_no(String group_no) {this.group_no = group_no;}

	/* 그룹 이름 */
	public String getGroup_name() {return group_name;}
	public void setGroup_name(String group_name) {this.group_name = group_name;}

	/* 그룹장 */
	public String getGroup_leader() {return group_leader;}
	public void setGroup_leader(String group_leader) {this.group_leader = group_leader;}
	
}
