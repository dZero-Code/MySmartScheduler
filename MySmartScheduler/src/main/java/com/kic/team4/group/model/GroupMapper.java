package com.kic.team4.group.model;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.kic.team4.group.controller.GroupBean;
import com.kic.team4.group.controller.GroupMembersBean;
import com.kic.team4.group.controller.GroupTodoBean;

public interface GroupMapper {
	
	/* 해당 사용자의 소속 그룹 리스트 */
	@Select("select group_no, group_name, group_leader from groups where group_leader=#{email} OR group_no = ANY(select group_no from group_members where group_members = #{email} and group_status = 1)")
	public List<GroupDto> selectGroups(String email);
	
	/* 그룹 생성 */
	@Insert("insert into groups (group_name, group_leader) values (#{group_name},#{group_leader})")
	public int insertGroups(GroupBean bean);
	
	/* 그룹 해제 */
	@Delete("delete from groups where group_no=#{group_no}")
	public int deleteGroups(String group_no);
	
	/* 그룹 멤버 추가 */
	@Insert("insert into group_members (group_no, group_members, group_status) values (#{group_no},#{group_members},#{group_status})")
	public int insertGroupMembers(GroupMembersBean bean);
	
	/* 그룹 멤버 리스트 */
	@Select("select no, group_no, group_members, group_status from group_members where group_no=#{group_no}")
	public List<GroupMembersDto> selectGroupMembers(String group_no);
	
	/* 그룹 멤버 상태변경 */
	@Update("update group_members set group_status = #{group_status} where group_members=#{group_members} AND group_no=#{group_no}")
	public int updateMemberStatus(GroupMembersBean bean);
	
	/* 그룹장 찾기*/
	@Select("select group_no, group_name, group_leader from groups where group_no=#{group_no}")
	public GroupDto selectGroupLeader(String group_no);
	
	/* 그룹장 변경*/
	@Update("update groups set group_leader=#{group_leader} where group_no=#{group_no}")
	public int updateGroupLeader(GroupBean bean); 
	
	/* 그룹장과 그룹원 변경 */
	@Update("update group_members set group_members=#{group_preLeader} where group_no=#{group_no} AND group_members=#{group_leader}")
	public int changeGroupMember(GroupBean bean);
	
	/* 멤버의 그룹 탈퇴 */
	@Delete("delete from group_members where group_members=#{group_members} AND group_no=#{group_no}")
	public int deleteGroupMembers(GroupMembersBean bean);
	
	/* 그룹 할일 */
	@Select("select no, group_no, title, content, start_reg, finish_reg, priority, status from group_todo where group_no=#{group_no}")
	public List<GroupTodoDto> selectGrouptodo(String group_no);
	
	/* 그룹 할일 status 변경*/
	@Update("update group_todo set status = #{status} where no= #{no}")
	public int updateGrouptodoStatus(GroupTodoBean bean);
	
	/* 그룹 할일 상세 보기*/
	@Select("select no, group_no, title, content, start_reg, finish_reg, priority, status from group_todo where group_no=#{group_no} AND no=#{no}")
	public GroupTodoDto selectDetail(GroupTodoDto dto);
	
	/* 그룹 할일 삭제*/
	@Delete("delete from group_todo where no= #{no}")
	public int deleteGrouptodo(String no);
	
	/* 그룹 할일 수정*/
	@Update("UPDATE group_todo SET title=#{title},content=#{content},start_reg=#{start_reg},finish_reg=#{finish_reg},priority=#{priority} WHERE group_no=#{group_no} AND no=#{no}")
	public int updateGrouptodo(GroupTodoBean bean);
	
	/* 그룹 할일 추가 */
	@Insert("INSERT INTO group_todo(group_no,title,content,start_reg,finish_reg,priority,status) VALUES(#{group_no},#{title},#{content},#{start_reg},#{finish_reg},#{priority},1)")
	public int insertGroupTodo(GroupTodoBean bean);
}
