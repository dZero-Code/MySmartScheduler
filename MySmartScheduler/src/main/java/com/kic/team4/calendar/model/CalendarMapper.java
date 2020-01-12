package com.kic.team4.calendar.model;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.kic.team4.calendar.controller.CalendarBean;

public interface CalendarMapper {
	/* 해당 월의 종료일이 존재하는 Todo의 갯수 */
	@Select("SELECT title, DATE_FORMAT(finish_reg,'%d') as finish ,COUNT(*) as count FROM todo WHERE email=#{email} GROUP BY finish_reg HAVING finish_reg LIKE CONCAT(#{finish},'%')")
	public List<CalendarBean> getCount(CalendarBean bean);
	
	/* 해당 종료일에 존재하는 Todo의 세부 정보 */
	@Select("SELECT NO,email,title,content,start_reg as start,finish_reg as finish,priority,status FROM todo WHERE email = #{email} AND finish_reg = #{finish}")
	public List<CalendarBean> detailTodo(CalendarBean bean);
	
}
