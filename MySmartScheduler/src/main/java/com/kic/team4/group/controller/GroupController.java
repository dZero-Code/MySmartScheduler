package com.kic.team4.group.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kic.team4.group.model.GroupDao;
import com.kic.team4.group.model.GroupDto;
import com.kic.team4.group.model.GroupMembersDto;
import com.kic.team4.group.model.GroupTodoDto;

@Controller
public class GroupController {
	@Autowired
	private GroupDao groupDao;
	
	/* 생성한 그룹 및 가입하여 승인된 그룹의 리스트로 이동하기 위한 Controller */
	@RequestMapping(value = "groupList", method = RequestMethod.GET)
	public String groupPage() {
		return "groupList";
	}
	
	/* 그룹 생성 및 가입하여 승인된 그룹의 리스트 정보를 받기 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "groupList", method = RequestMethod.POST)
	public Map<String,Object> groupList(@RequestParam("email") String email) {
		// json화 시키기 위한 객체 생성
		List<Map<String, String>> dataList = new ArrayList<Map<String,String>>();
		
		// 현재 사용자의 이메일 정보를 받아 사용자의 가입된 그룹리스트 정보 전부 가져오기
		List<GroupDto> tododatas = groupDao.groupList(email);
		
		// 데이터 json화 시키기
		for (GroupDto t : tododatas) {
			Map<String, String> data = new HashMap<String, String>();
			data.put("group_no", t.getGroup_no());
			data.put("group_name", t.getGroup_name());
			data.put("group_leader", t.getGroup_leader());
			dataList.add(data);
		}
		
		// 해당 정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> groupList = new HashMap<String, Object>();
		groupList.put("data",dataList);
		
		return groupList;
	}

	/* 그룹 생성을 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "addGroups", method = RequestMethod.POST)
	public Map<String,Object> addGroups(@RequestParam("group_leader") String group_leader, 
										@RequestParam("group_name") String group_name) {
		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// 그룹이름과 그룹장(생성하는자의 email)을 받아 setter로 설정
		GroupBean bean = new GroupBean();
		bean.setGroup_name(group_name);
		bean.setGroup_leader(group_leader);
		
		// DB 접근을 통해 그룹 생성 (insert)
		int re = groupDao.addGroup(bean);
		
		// 성공시 check에 true, 실패시 check에 false를 전송
		if(re > 0) data.put("check", "true");
		else data.put("check", "false");
		
		// 성공 실패 여부를 json화 시켜서 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> groupList = new HashMap<String, Object>();
		groupList.put("data",data);
		
		return groupList;
	}
	
	/* 그룹에 신청하여 그룹멤버를 추가하는 Controller */
	@ResponseBody
	@RequestMapping(value = "addGroupMember", method = RequestMethod.POST)
	public Map<String,Object> addGroupMember(@RequestParam("group_no") String group_no, 
										@RequestParam("group_members") String group_members) {
		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// 신청한 그룹의 번호와 신청자(email)를 setter를 통해 설정
		GroupMembersBean bean = new GroupMembersBean();
		bean.setGroup_no(group_no);
		bean.setGroup_members(group_members);
		bean.setGroup_status("0");				// 0 : 회원가입 승인처리가 되지 않은 상태로 추가
		
		// DB 접근을 통해 그룹멤버를 추가
		int re = groupDao.addMembers(bean);
		
		// 성공시 check에 true, 실패시 check에 false를 전송
		if(re > 0) data.put("check", "true");
		else data.put("check", "false");
		
		// 성공 실패 여부를 json화 시켜서 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> groupList = new HashMap<String, Object>();
		groupList.put("data",data);
		
		return groupList;
	}
	
	/* 그룹멤버 관리를 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "groupManager", method = RequestMethod.POST)
	public Map<String,Object> groupManager(@RequestParam("group_no") String group_no) {
		// json화 시키기 위한 객체 생성
		List<Map<String, String>> dataList = new ArrayList<Map<String,String>>();
		
		// 그룹번호를 받아 DB 접근을 통한 해당 그룹의 멤버 리스트 정보를 받아옴
		List<GroupMembersDto> tododatas = groupDao.groupMembersList(group_no);
		
		// 데이터 json화 시키기
		for (GroupMembersDto t : tododatas) {
			Map<String, String> data = new HashMap<String, String>();			
			data.put("group_no", t.getGroup_no());
			data.put("group_members", t.getGroup_members());
			data.put("group_status", t.getGroup_status());
			dataList.add(data);
		}
		
		// 해당 그룹의 그룹번호와, 멤버정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> groupList = new HashMap<String, Object>();
		groupList.put("data",dataList);
		groupList.put("group_no", group_no);
		
		return groupList;
	}
	
	/* 해당 그룹의 멤버 상태 변경을 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "groupMemberManager", method = RequestMethod.POST)
	public Map<String,Object> groupMemberManager(@RequestParam("group_no") String group_no,
											@RequestParam("group_members") String group_members,
											@RequestParam("isOk") String isOk) {

		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// 그룹번호, 그룹멤버, isOk(가입승인 여부)를 받아 setter로 설정
		GroupMembersBean bean = new GroupMembersBean();
		bean.setGroup_no(group_no);
		bean.setGroup_members(group_members);
		// isOk가 true인 경우 그룹원 상태 : 1 (회원)
		if(Boolean.valueOf(isOk)) bean.setGroup_status("1");
		// isOK가 false인 경우 그룹원 상태 : -1 (거절 및 추방)
		else bean.setGroup_status("-1");
		
		// DB 접근을 통해 해당 멤버의 상태값을 변경
		int re = groupDao.updateMemberStatus(bean);
		
		// 성공시 check에 true, 실패시 check에 false를 전송
		if(re > 0) data.put("check", "true");
		else data.put("check","false");
		
		// 성공 실패 여부를 json화 시켜서 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> groupList = new HashMap<String, Object>();
		groupList.put("data",data);
		
		return groupList;
	}
	
	/* 그룹장 위임을 위한 Controller */
	@ResponseBody
	@RequestMapping(value="updateGroupLeader", method=RequestMethod.POST)
	public Map<String, Object> updateGroupLeader(@RequestParam("group_leader") String group_leader,
												 @RequestParam("group_no") String group_no){
		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// 그룹번호를 통해 해당 그룹의 현 그룹장 정보를 가져옴
		GroupDto dto = groupDao.searchLeader(group_no);
		
		// 바꿀 그룹장의 정보와 수정할 그룹번호, 이전 그룹장 정보를 각각 setter를 통해 설정
		GroupBean bean = new GroupBean();
		bean.setGroup_leader(group_leader);					// 위임할 그룹장 이메일 정보
		bean.setGroup_no(group_no);							// 그룹 정보
		bean.setGroup_preLeader(dto.getGroup_leader());		// 이전 그룹장의 이메일 정보
		
		// DB 접근을 통한 그룹장 변경
		int re = groupDao.updateGroupLeader(bean);
		
		// 결과값 성공시
		if(re > 0) {
			// 그룹장으로 변경한 그룹멤버와 이전 그룹장의 정보 변경 (멤버 -> 그룹장, 그룹장 -> 멤버)
			int re2 = groupDao.changeGroupMember(bean);
			
			// 결과값 성공시
			if(re2>0)
				data.put("check", "true");
		}
		// 결과값 실패시
		else {
			data.put("check","false");
		}
		
		// 성공 실패 여부를 json화 시켜서 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> groupList = new HashMap<String, Object>();
		groupList.put("data",data);
		
		return groupList;
	}
	
	/* 그룹해제 및 그룹탈퇴를 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "groupExit", method = RequestMethod.POST)
	public Map<String,Object> groupExit(@RequestParam("email") String email,
										@RequestParam("group_no") String group_no) {

		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();

		// 그룹의 리더인 경우 그룹해제 그룹원인 경우 그룹나가기이기 때문에 
		// 해당 그룹의 그룹장의 정보를 DB에 접근하여 받아옴.
		GroupDto dto = groupDao.searchLeader(group_no);
		
		// 그룹장이 아닌경우 (그룹 나가기)
		if(! email.equals(dto.getGroup_leader())) {
			// 그룹번호와 해당 그룹멤버의 정보를 setter를 통해 설정
			GroupMembersBean bean = new GroupMembersBean();
			bean.setGroup_no(group_no);
			bean.setGroup_members(email);
			
			// DB 접근을 통한 그룹나가기 (delete)
			int re = groupDao.GroupExit(bean);
			if(re > 0) data.put("check", "true");
			else data.put("check","false");
		// 그룹장인 경우 (그룹해제)
		}else {
			// DB접근을 통한 그룹해제(삭제)
			groupDao.deleteGroups(group_no);
		}
		
		// 성공 실패 여부를 json화 시켜서 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> groupList = new HashMap<String, Object>();
		groupList.put("data",data);
		
		return groupList;
	}
	
	/* 그룹의 할일 정보를 받아오기 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "groupTodo", method = RequestMethod.POST)
	public Map<String,Object> groupTodo(@RequestParam("group_no") String group_no,
										@RequestParam("no") String no,
										@RequestParam("status") String status) {
		List<Map<String, String>> dataList = new ArrayList<Map<String,String>>();
		
		// 상태를 변경한 경우 (처음 Todo의 전체정보를 불러온 경우 이부분이 0로 셋팅되어 온다.)
		if(!status.equals("0")) {
			// Todo -> Do -> Done의 각각의 상태 변경을 위한 부분
			GroupTodoBean bean = new GroupTodoBean();
			bean.setStatus(status);
			bean.setNo(no);
			
			// 상태값을 DB 접근을 통해 변경해줌
			groupDao.updateStatus(bean);
		}
		
		// 해당 Email의 Group 전부 가져오기
		List<GroupTodoDto> tododatas = groupDao.GrouptodoList(group_no);
		
		// 데이터 json화 시키기
		for (GroupTodoDto t : tododatas) {
			Map<String, String> data = new HashMap<String, String>();
			
			data.put("no", t.getNo());
			data.put("group_no", t.getGroup_no());
			data.put("title", t.getTitle());
			data.put("content", t.getContent());
			data.put("title", t.getTitle());
			data.put("start_reg", t.getStart_reg());
			data.put("finish_reg", t.getFinish_reg());
			data.put("priority", t.getPriority());
			data.put("status", t.getStatus());
			
			dataList.add(data);
		}
		
		// 해당 그룹의 그룹번호와, 그룹할일정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> groupList = new HashMap<String, Object>();
		groupList.put("data",dataList);
		groupList.put("group_no",group_no);
		
		// 해당 그룹의 그룹장도 같이 json으로 다시 ajax 부분으로 넘겨준다.
		GroupDto gdto = groupDao.searchLeader(group_no);
		groupList.put("group_leader", gdto.getGroup_leader());
		
		return groupList;
	}
	
	/* 그룹할일 추가 페이지로 이동하기 위한 Controller */
	@ResponseBody
	@RequestMapping(value="addGroupTodoPage", method=RequestMethod.GET)
	public Map<String,Object> grouptodoAddPage(
			@RequestParam("group_no") String group_no) {
		Map<String, Object> addTodo = new HashMap<String, Object>();
		
		addTodo.put("data",group_no);
		return addTodo;
	}

	/* 그룹할일 추가를 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "addGroupTodo", method = RequestMethod.POST)
	public Map<String, Object> todoAddSubmit(
			@RequestParam("group_no") String group_no,
			@RequestParam("title") String title,
			@RequestParam("content") String content,
			@RequestParam("start_reg") String start_reg,
			@RequestParam("finish_reg") String finish_reg,
			@RequestParam("priority") String priority) {

		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// 파라미터로 받아온 값을 setter로 설정
		GroupTodoBean bean = new GroupTodoBean();
		bean.setGroup_no(group_no);
		bean.setTitle(title);
		bean.setContent(content);
		bean.setStart_reg(start_reg);
		bean.setFinish_reg(finish_reg);
		bean.setPriority(priority);
		
		// DB접근을 통해 그룹 할일을 추가
		int re = groupDao.insertGroupTodo(bean);
		// 결과값 성공시
		if(re > 0)  data.put("check","true");
		// 결과값 실패시
		else data.put("check","false");

		// 성공 실패 여부를 json화 시켜서 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
	
	/* 그룹 할일의 세부정보를 위한 Controller */
	@ResponseBody
	@RequestMapping(value="groupTodoDetail", method=RequestMethod.GET)
	public Map<String,Object> groupTodoDetail(
			@RequestParam("group_no") String group_no,
			@RequestParam("no") String no) {
		
		// 그룹번호와 해당 그룹할일의 고유번호(ID)를 setter를 통해 설정
		GroupTodoDto dto = new GroupTodoDto();
		dto.setGroup_no(group_no);
		dto.setNo(no);
		
		// DB 접근을 통해 그룹할일의 세부정보값을 가져옴
		GroupTodoDto tododatas = groupDao.groupTodoDetail(dto);
		
		// 데이터 json화 시키기
		Map<String, String> data = new HashMap<String, String>();
		data.put("no",tododatas.getNo());
		data.put("group_no",tododatas.getGroup_no());
		data.put("title",tododatas.getTitle());
		data.put("content",tododatas.getContent());
		data.put("start_reg",tododatas.getStart_reg());
		data.put("finish_reg",tododatas.getFinish_reg());
		data.put("priority",tododatas.getPriority());
		data.put("status",tododatas.getStatus());
		
		// 그룹할일정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
	
	/* 그룹 수정 페이지로 이동하기 위한 Controller */
	@ResponseBody
	@RequestMapping(value="groupTodoModifyPage", method=RequestMethod.GET)
	public Map<String,Object> groupTodoModifyPage(
			@RequestParam("group_no") String group_no,
			@RequestParam("no") String no) {
		
		// 수정할 그룹 정보를 setter로 설정
		GroupTodoDto dto = new GroupTodoDto();
		dto.setGroup_no(group_no);
		dto.setNo(no);
		
		// 그룹의 세부정보를 DB 접근을 통해 가져옴
		GroupTodoDto tododatas = groupDao.groupTodoDetail(dto);
		
		// 데이터 json화 시키기
		Map<String, String> data = new HashMap<String, String>();
		data.put("no",tododatas.getNo());
		data.put("group_no",tododatas.getGroup_no());
		data.put("title",tododatas.getTitle());
		data.put("content",tododatas.getContent());
		data.put("start_reg",tododatas.getStart_reg());
		data.put("finish_reg",tododatas.getFinish_reg());
		data.put("priority",tododatas.getPriority());
		data.put("status",tododatas.getStatus());
		
		// 수정할 그룹할일정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
	
	/* 그룹 할일의 수정을 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "groupTodoModify", method = RequestMethod.POST)
	public Map<String, Object> groupModifySubmit(
			@RequestParam("no") String no,
			@RequestParam("group_no") String group_no,
			@RequestParam("title") String title,
			@RequestParam("content") String content,
			@RequestParam("start_reg") String start_reg,
			@RequestParam("finish_reg") String finish_reg,
			@RequestParam("priority") String priority) {

		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// 수정할 그룹할일 정보를 파라미터로 받아와 setter로 설정
		GroupTodoBean bean = new GroupTodoBean();
		bean.setNo(no);
		bean.setGroup_no(group_no);
		bean.setTitle(title);
		bean.setContent(content);
		bean.setStart_reg(start_reg);
		bean.setFinish_reg(finish_reg);
		bean.setPriority(priority);
		
		// DB접근을 통한 그룹할일 수정
		int re = groupDao.updateGrouptodo(bean);
		if(re > 0)  data.put("check","true");
		else data.put("check","false");

		// 결과값을 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
	
	/* 그룹할일 삭제를 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "groupTododelete", method = RequestMethod.POST)
	public Map<String, Object> delete(
			@RequestParam("no") String no) {

		// json화 시키기 위한 객체 생성
		Map<String, String> data = new HashMap<String, String>();
		
		// DB 접근을 통해 그룹할일 삭제
		int re = groupDao.deleteGrouptodo(no);
		if(re > 0)  data.put("check","true");
		else data.put("check","false");

		// 결과값을 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> todoList = new HashMap<String, Object>();
		todoList.put("data",data);
		return todoList;
	}
}
