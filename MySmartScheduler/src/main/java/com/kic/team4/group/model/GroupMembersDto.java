package com.kic.team4.group.model;

/* 그룹별 멤버현황 Dto */
public class GroupMembersDto {
	private String no, group_no, group_members, group_status;

	/* 순번 */
	public String getNo() {return no;}
	public void setNo(String no) {this.no = no;}

	/* 그룹번호 */
	public String getGroup_no() {return group_no;}
	public void setGroup_no(String group_no) {this.group_no = group_no;}

	/* 그룹에 속한 멤버 */
	public String getGroup_members() {return group_members;}
	public void setGroup_members(String group_members) {this.group_members = group_members;}

	/* 멤버의 신청 및 수락을 나타내는 상태 0 : 신청, 1 : 수락 */
	public String getGroup_status() {return group_status;}
	public void setGroup_status(String group_status) {this.group_status = group_status;	}
	
	
}
