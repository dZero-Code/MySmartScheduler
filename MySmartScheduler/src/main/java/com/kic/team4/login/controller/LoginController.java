package com.kic.team4.login.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kic.team4.login.model.LoginDao;
import com.kic.team4.login.model.LoginDto;

@Controller
public class LoginController {
	@Autowired
	@Qualifier("loginDaoImpl")
	private LoginDao loginDao;
	
	/* 로그인 페이지로 이동하기 위한 Controller */ 
	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String rediectLogin() {
		return "login";
	}
	
	/* 로그인 버튼을 위한 Controller */
	@ResponseBody
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public Map<String, Object> loginSubmitProcess(HttpSession session, LoginDto dto) {
		// json화 시키기 위한 객체 생성
		Map<String, Object> user = new HashMap<String, Object>();
		
		// DB접근 통한 로그인가능한 계정인지 확인
		LoginDto loginDto = loginDao.login(dto);
		
		// 로그인 가능한 경우 (객체 존재)
		if(loginDto != null) {
			//세션 생성
			session.setAttribute("email", loginDto.getEmail());
			
			// 로그인한 사용자 email를 ajax 부분으로 넘겨줌
			user.put("loginInfo", loginDto.getEmail());
		}
			
		return user;
	}
	
	/* 로그인 성공시 Main으로 이동하기 위한 Controller */
	@RequestMapping(value = "main", method = RequestMethod.GET)
	public String redirectMain() {
		return "todo";
	}
	
	/* 로그아웃을 통한 세션 삭제 및 로그인 페이지로 이동하기 위한 Controller */
	@RequestMapping(value = "logout")
	public String Logout(HttpSession session) {
		// 세션객체가 존재하면
		if(session != null)
			session.invalidate();		// 세션 해제
		
		// 로그인 페이지로 이동
		return "login";
	}
}
