package com.kic.team4.todo.model;

import java.util.List;

import com.kic.team4.todo.controller.TodoBean;

public interface TodoDao {
	/* Todo Data 전체 가져오기 */
	public List<TodoDto> selectAll(String email);
	
	/* Todo Data의 status 바꾸기 (todo -> do -> done) */
	public int updateStatus(TodoBean bean);
	
	/* Todo Data의 상세보기 */
	TodoDto selectDetail(TodoDto dto);
	
	/* Todo Data 추가 */
	int insertTodo(TodoBean bean);
	
	/* Todo Data 수정 */
	int updateTodo(TodoBean bean);
	
	/* Todo Data 삭제 */
	int deleteTodo(String no);
}
