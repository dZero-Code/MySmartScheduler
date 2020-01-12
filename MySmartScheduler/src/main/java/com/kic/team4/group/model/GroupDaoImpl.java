package com.kic.team4.group.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kic.team4.group.controller.GroupBean;
import com.kic.team4.group.controller.GroupMembersBean;
import com.kic.team4.group.controller.GroupTodoBean;

@Component
public class GroupDaoImpl implements GroupDao{
	@Autowired
	private GroupMapper groupMapper;
	
	/* 해당 유저의 그룹 리스트 */
	@Override
	public List<GroupDto> groupList(String email) {
		return groupMapper.selectGroups(email);
	}
	
	/* 그룹 생성 */
	@Override
	public int addGroup(GroupBean bean) {
		return groupMapper.insertGroups(bean);
	}
	
	/* 그룹 해제 */
	@Override
	public int deleteGroups(String group_no) {
		return groupMapper.deleteGroups(group_no);
	}
	
	/* 그룹 신청 */
	@Override
	public int addMembers(GroupMembersBean bean) {
		return groupMapper.insertGroupMembers(bean);
	}
	
	/* 그룹 관리를 위한 그룹원 리스트*/
	@Override
	public List<GroupMembersDto> groupMembersList(String group_no) {
		return groupMapper.selectGroupMembers(group_no);
	}
	
	/* 그룹 멤버의 상태 변경*/
	@Override
	public int updateMemberStatus(GroupMembersBean bean) {
		return groupMapper.updateMemberStatus(bean);
	}
	
	/* 그룹장 찾기 */
	@Override
	public GroupDto searchLeader(String group_no) {
		return groupMapper.selectGroupLeader(group_no);
	}
	
	/* 그룹장 변경 */
	@Override
	public int updateGroupLeader(GroupBean bean) {
		return groupMapper.updateGroupLeader(bean);
	}
	
	/* 그룹장과 그룹원 변경 */
	public int changeGroupMember(GroupBean bean) {
		return groupMapper.changeGroupMember(bean);
	}
	
	/* 그룹 탈퇴 */
	@Override
	public int GroupExit(GroupMembersBean bean) {
		return groupMapper.deleteGroupMembers(bean);
	}
	
	/* 그룹 할일 */
	@Override
	public List<GroupTodoDto> GrouptodoList(String group_no) {
		return groupMapper.selectGrouptodo(group_no);
	}
	
	/* 그룹 할일 상세 보기*/
	@Override
	public GroupTodoDto groupTodoDetail(GroupTodoDto dto) {
		return groupMapper.selectDetail(dto);
	}
	
	/* 그룹 할일 추가 */
	@Override
	public int insertGroupTodo(GroupTodoBean bean) {
		return groupMapper.insertGroupTodo(bean);
	}
	
	/* 그룹 할일 status 변경*/
	@Override
	public int updateStatus(GroupTodoBean bean) {
		return groupMapper.updateGrouptodoStatus(bean);
	}
	
	/* 그룹 할일 수정*/
	@Override
	public int updateGrouptodo(GroupTodoBean bean) {
		return groupMapper.updateGrouptodo(bean);
	}
	
	/* 그룹 할일 삭제 */
	@Override
	public int deleteGrouptodo(String no) {
		return groupMapper.deleteGrouptodo(no);
	}
}
