package com.kic.team4.calendar.model;

import java.util.List;

import com.kic.team4.calendar.controller.CalendarBean;

public interface CalendarDao {
	/* 해당 월의 종료일이 존재하는 Todo의 갯수 */
	public List<CalendarBean> getCount(CalendarBean bean);
	
	/* 해당 종료일에 존재하는 Todo의 세부 정보 */
	public List<CalendarBean> detailTodo(CalendarBean bean);
}
