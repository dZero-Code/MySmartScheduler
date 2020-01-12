package com.kic.team4.calendar.controller;

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

import com.kic.team4.calendar.model.CalendarDao;

@Controller
public class CalendarController {
	@Autowired
	private CalendarDao calendarDao;
	
	/* 캘랜더 페이지로 이동하기 위한 Controller */ 
	@RequestMapping(value = "calendar", method = RequestMethod.GET)
	public String rediectCalendar() {
		return "calendar";
	}

	/* 해당 월의 종료해야할 Todo의 갯수와 종료일을 넘겨주는 Controller */
	@ResponseBody
	@RequestMapping(value = "calendar", method = RequestMethod.POST)
	public Map<String,Object> calendar(
				@RequestParam("email") String email,
				@RequestParam("reg") String reg) {
		
		// json화 시키기 위한 객체 생성
		List<Map<String, String>> dataList = new ArrayList<Map<String,String>>();
		Map<String, String> data = null;
		
		// 사용자 이메일과 종료일을 받아와서 setter로 설정
		CalendarBean bean = new CalendarBean();
		bean.setEmail(email);
		bean.setFinish(reg);
		
		// DB 접근를 통해 해당 월의 종료해야할 Todo의 갯수, 제목, 종료일을 가져옴
		List<CalendarBean> calendardatas = calendarDao.getCount(bean);
		
		// json화 시킨다.
		for (CalendarBean b : calendardatas) {
			data = new HashMap<String, String>();
			data.put("count",b.getCount());
			data.put("title", b.getTitle());
			data.put("finish",b.getFinish());
			
			dataList.add(data);
		}
		
		// 해당 정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> finalList = new HashMap<String, Object>();
		finalList.put("data",dataList);
		return finalList;
	}
	
	/* 캘랜더를 클릭하는 경우 나타날 세부 정보 */
	@RequestMapping("calendarDetail")
	@ResponseBody
	public Map<String,Object> calDetail(
			@RequestParam("email") String email,
			@RequestParam("reg") String reg) {
		
		// json화 시키기 위한 객체 생성
		List<Map<String, String>> dataList = new ArrayList<Map<String,String>>();
		Map<String, String> data = null;
		
		// 사용자 이메일과 종료일을 가져와서 setter를 이용해 설정
		CalendarBean bean = new CalendarBean();
		bean.setEmail(email);
		bean.setFinish(reg);
		
		// DB 접근을 통해 세부 정보를 가져옴
		List<CalendarBean> calendardatas = calendarDao.detailTodo(bean);
		
		// json화 시킨다.
		for (CalendarBean t : calendardatas) {
			data = new HashMap<String, String>();
			data.put("no",t.getNo());
			data.put("title",t.getTitle());
			data.put("content",t.getContent());
			data.put("start",t.getStart());
			data.put("finish",t.getFinish());
			data.put("priority",t.getPriority());
			data.put("status",t.getStatus());
			data.put("count",t.getCount());
			dataList.add(data);
		}
		
		// 해당 정보를 json으로 다시 ajax 부분으로 넘겨준다.
		Map<String, Object> finalList = new HashMap<String, Object>();
		finalList.put("data",dataList);
		return finalList;
	}
}
