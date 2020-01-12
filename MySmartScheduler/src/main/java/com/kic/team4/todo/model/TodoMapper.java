package com.kic.team4.todo.model;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.kic.team4.todo.controller.TodoBean;

public interface TodoMapper {
	/* Todo Data 전체 가져오기 */
	@Select("select * from todo where email = #{email} ORDER BY status asc,priority ASC,finish_reg ASC")
	public List<TodoDto> selectTodoAll(String email);
	
	/* Todo Data의 status 바꾸기 (todo -> do -> done) */
	@Update("update todo set status = #{chk} where no = #{no}")
	public int updateStatus(TodoBean bean);
	
	/* Todo Data의 상세보기 */
	@Select("select * from todo where email = #{email} and no = #{no}")
	public TodoDto selectDetail(TodoDto dto);
	
	/* Todo Data 추가 */
	@Insert("INSERT INTO todo(email,title,content,start_reg,finish_reg,priority,status) VALUES(#{email},#{title},#{content},#{start_reg},#{finish_reg},#{priority},1)")
	public int insertTodo(TodoBean bean);
	
	/* Todo Data 수정 */
	@Update("UPDATE todo SET title=#{title},content=#{content},start_reg=#{start_reg},finish_reg=#{finish_reg},priority=#{priority} WHERE email=#{email} AND no=#{no}")
	public int updateTodo(TodoBean bean);
	
	/* Todo Data 삭제 */
	@Insert("DELETE FROM todo WHERE no=#{no} ")
	public int deleteTodo(String no);
}
