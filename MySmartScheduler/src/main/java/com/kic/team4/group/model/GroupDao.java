package com.kic.team4.group.model;

import java.util.List;

import com.kic.team4.group.controller.GroupBean;
import com.kic.team4.group.controller.GroupMembersBean;
import com.kic.team4.group.controller.GroupTodoBean;

public interface GroupDao {
	/* 해당 유저의 그룹 리스트 */
	public List<GroupDto> groupList(String email);
	
	/* 그룹 생성 */
	public int addGroup(GroupBean bean);
	
	/* 그룹 해제 */
	public int deleteGroups(String group_no);
	
	/* 그룹 신청 */
	public int addMembers(GroupMembersBean bean);
	
	/* 그룹 관리를 위한 그룹원 리스트*/
	public List<GroupMembersDto> groupMembersList(String group_no);
	
	/* 그룹 멤버의 상태 변경*/
	public int updateMemberStatus(GroupMembersBean bean);
	
	/* 그룹장 찾기*/
	public GroupDto searchLeader(String group_no); 
	
	/* 그룹장 변경*/
	public int updateGroupLeader(GroupBean bean); 
	
	/* 그룹장과 그룹원 변경 */
	public int changeGroupMember(GroupBean bean);
	
	/* 그룹 탈퇴 */
	public int GroupExit(GroupMembersBean bean);
	
	/* 그룹 할일 */
	public List<GroupTodoDto> GrouptodoList(String group_no);
	
	/* 그룹 할일 상세 보기*/
	public GroupTodoDto groupTodoDetail(GroupTodoDto dto);
	
	/* 그룹 할일 추가 */
	public int insertGroupTodo(GroupTodoBean bean);
	
	/* 그룹 할일 status 변경*/
	public int updateStatus(GroupTodoBean bean);
	
	/* 그룹 할일 수정*/
	public int updateGrouptodo(GroupTodoBean bean);
	
	/* 그룹 할일 삭제 */
	public int deleteGrouptodo(String no);
}
