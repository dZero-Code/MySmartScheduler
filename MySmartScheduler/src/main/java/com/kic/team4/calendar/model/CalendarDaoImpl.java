package com.kic.team4.calendar.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kic.team4.calendar.controller.CalendarBean;

@Component
public class CalendarDaoImpl implements CalendarDao{
	@Autowired
	private CalendarMapper calendarMapper;
	
	/* 해당 월의 종료일이 존재하는 Todo의 갯수 */
	@Override
	public List<CalendarBean> getCount(CalendarBean bean) {
		return calendarMapper.getCount(bean);
	}
	
	/* 해당 종료일에 존재하는 Todo의 세부 정보 */
	@Override
	public List<CalendarBean> detailTodo(CalendarBean bean) {
		return calendarMapper.detailTodo(bean);
	}
}
