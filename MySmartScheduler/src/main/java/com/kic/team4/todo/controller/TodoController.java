package com.kic.team4.todo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kic.team4.todo.model.TodoDto;
import com.kic.team4.todo.model.TodoDao;

@Controller
public class TodoController {
	@Autowired
	@Qualifier("todoDaoImpl")
	private TodoDao inter;
	
	/* 할일 리스트를 위한 Controller */
	@ResponseBody
	@RequestMapping(value="todoList", method=RequestMethod.GET)
	public Map<String,Object> todoList(
			@RequestParam("status") String status,
			@RequestParam("no") String no,
			@RequestParam("email") String email) {
		
		// json화 시키기 위한 객체 생성
		List<Map<String, String>> dataList = new ArrayList<Map<String,String>>();
		Map<String, String> data = null;
		
		// 상태를 변경한 경우 (처음 Todo의 전체정보를 불러온 경우 이부분이 0로 셋팅되어 온다.)
		if(!status.equals("0")) {
			// Todo -> Do -> Done의 각각의 상태 변경을 위한 부분
			TodoBean bean = new TodoBean();
			bean.setChk(status);
			bean.setNo(no);
			inter.updateStatus(bean);
		}
		
		// 해당 Email의 Todo 데이터 전부 가져오기
		List<TodoDto> tododatas = inter.selectAll(email);
		
		// 데이터 json화 시키기
		for (TodoDto t : tododatas) {
			data = getMap(t);
			dataList.add(data);
		}
		
		// 할일정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",dataList);
		
		return todoList;
	}
	
	/* 할일 세부정보를 위한 Controller */
	@ResponseBody
	@RequestMapping(value="todoDetail", method=RequestMethod.GET)
	public Map<String,Object> todoData(
			@RequestParam("email") String email,
			@RequestParam("no") String no) {
		
		// 사용자 이메일과 할일 고유번호(ID)를 setter를 통해 설정
		TodoDto dto = new TodoDto();
		dto.setEmail(email);
		dto.setNo(no);
		
		// DB 접근을 통해 할일의 세부정보값을 가져옴
		TodoDto tododatas = inter.selectDetail(dto);
		
		// 데이터 json화 시키기
		Map<String, String> data = null;
		data = getMap(tododatas);
		Map<String, Object> todoList = new HashMap<String, Object>();
		
		todoList.put("data",data);
		return todoList;
	}
	
	/* 할일 추가 페이지로 이동하기 위한 Controller */
	@ResponseBody
	@RequestMapping(value="addPage", method=RequestMethod.GET)
	public Map<String,Object> todoAddPage(
			@RequestParam("email") String email) {
		
		Map<String, Object> addTodo = new HashMap<String, Object>();
		addTodo.put("data",email);
		return addTodo;
	}
	
	/* 할일 추가를 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Map<String, Object> memoAddSubmit(
			@RequestParam("email") String email,
			@RequestParam("title") String title,
			@RequestParam("content") String content,
			@RequestParam("start_reg") String start_reg,
			@RequestParam("finish_reg") String finish_reg,
			@RequestParam("priority") String priority) {

		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// 파라미터로 받아온 값을 setter로 설정
		TodoBean bean = new TodoBean();
		bean.setEmail(email);
		bean.setTitle(title);
		bean.setContent(content);
		bean.setStart_reg(start_reg);
		bean.setFinish_reg(finish_reg);
		bean.setPriority(priority);
		
		// DB접근을 통한 할일 추가
		int re = inter.insertTodo(bean);
		// 결과값 성공시
		if(re > 0)  data.put("check","true");
		// 결과값 실패시
		else data.put("check","false");

		// 성공 실패 여부를 json화 시켜서 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
	
	/* 그룹 수정 페이지로 이동하기 위한 Controller */
	@ResponseBody
	@RequestMapping(value="modifyPage", method=RequestMethod.GET)
	public Map<String,Object> todoModifyPage(
			@RequestParam("email") String email,
			@RequestParam("no") String no) {
		
		// 수정할 알일 정보를 setter로 설정
		TodoDto dto = new TodoDto();
		dto.setEmail(email);
		dto.setNo(no);
		
		// 해당 할일의 세부정보를 DB 접근을 통해 가져옴
		TodoDto tododatas = inter.selectDetail(dto);
		
		// 데이터 json화 시키기
		Map<String, String> data = null;
		data = getMap(tododatas);
		
		// 수정할 할일정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
	
	/* 할일 수정을 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "modify", method = RequestMethod.POST)
	public Map<String, Object> modifySubmit(
			@RequestParam("no") String no,
			@RequestParam("email") String email,
			@RequestParam("title") String title,
			@RequestParam("content") String content,
			@RequestParam("start_reg") String start_reg,
			@RequestParam("finish_reg") String finish_reg,
			@RequestParam("priority") String priority) {

		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// 수정할 할일 정보를 파라미터로 받아와 setter로 설정
		TodoBean bean = new TodoBean();
		bean.setNo(no);
		bean.setEmail(email);
		bean.setTitle(title);
		bean.setContent(content);
		bean.setStart_reg(start_reg);
		bean.setFinish_reg(finish_reg);
		bean.setPriority(priority);
		
		// DB접근을 통한 할일 수정
		int re = inter.updateTodo(bean);
		if(re > 0)  data.put("check","true");
		else data.put("check","false");

		// 결과값을 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
	
	/* 할일의 삭제을 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public Map<String, Object> delete(
			@RequestParam("no") String no) {

		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// DB 접근을 통해 할일 삭제
		int re = inter.deleteTodo(no);
		if(re > 0)  data.put("check","true");
		else data.put("check","false");

		// 결과값을 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
	
	// TodoData Map 형식으로 변환하기 위한 함수
	public Map<String, String> getMap(TodoDto todoData) {
		Map<String, String> data = new HashMap<String, String>();
		
		data.put("no",todoData.getNo());
		data.put("title",todoData.getTitle());
		data.put("email",todoData.getEmail());
		data.put("content",todoData.getContent());
		data.put("start_reg",todoData.getStart_reg());
		data.put("finish_reg",todoData.getFinish_reg());
		data.put("priority",todoData.getPriority());
		data.put("status",todoData.getStatus());
		
		return data;
	}
}
