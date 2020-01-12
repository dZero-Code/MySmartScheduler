package com.kic.team4.todo.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kic.team4.todo.controller.TodoBean;


@Component
public class TodoDaoImpl implements TodoDao {

	@Autowired
	private TodoMapper todoMapper;
	
	/* Todo Data 전체 가져오기 */
	@Override
	public List<TodoDto> selectAll(String email) {	
		return todoMapper.selectTodoAll(email);
	}
	
	/* Todo Data의 status 바꾸기 (todo -> do -> done) */
	@Override
	public int updateStatus(TodoBean bean) {
		return todoMapper.updateStatus(bean);
	}
	
	/* Todo Data의 상세보기 */
	@Override
	public TodoDto selectDetail(TodoDto dto) {
		return todoMapper.selectDetail(dto);
	}
	
	/* Todo Data 추가 */
	@Override
	public int insertTodo(TodoBean bean) {
		return todoMapper.insertTodo(bean);
	}
	
	/* Todo Data 수정 */
	@Override
	public int updateTodo(TodoBean bean) {
		return todoMapper.updateTodo(bean);
	}
	
	/* Todo Data 삭제 */
	@Override
	public int deleteTodo(String no) {
		return todoMapper.deleteTodo(no);
	}	
}
