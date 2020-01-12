package com.kic.team4.signup.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.kic.team4.signup.model.SignupDao;
import com.kic.team4.signup.model.SignupDto;

@Controller
public class SignupController {
	@Autowired
	private SignupDao signupDao;
	
	/* 회원가입 페이지로 이동하기 위한 Controller */
	@RequestMapping(value = "signup", method = RequestMethod.GET)
	public String  signupPage(SignupDto dto) {
		return "signup";
	}
	
	/* 회원가입을 통한 유저 추가 */
	@RequestMapping(value = "signup", method = RequestMethod.POST)
	public ModelAndView inserUser(SignupDto dto) {
		// 회원가입 성공시 welcome 페이지로 이동
		ModelAndView view = new ModelAndView("redirect:welcome");
		
		// DB 접근을 통해 유저정보를 추가
		int re = signupDao.insertUser(dto);
		
		// 결과값
		if(re > 0)
			view.addObject("email");
		
		return view;
	}
	
	/* 회원가입 성공 페이지(welcome)으로 이동하기 위한 Controller */
	@RequestMapping("welcome")
	public String welcome() {
		return "welcome";
	}
	
	/* 이메일의 존재여부를 체크하기 위한 Controller */
	@ResponseBody
	@RequestMapping("chkEmail")
	public Map<String, Object> loginSubmitProcess(@RequestParam("email") String email) {
		// json화 시키기 위한 객체 생성
		Map<String, Object> user = new HashMap<String, Object>();
		
		// 이메일의 존재여부 체크를 위한 DB 접근
		SignupDto dto = signupDao.chkEmail(email);
		
		// 객체가 존재하면 해당 이메일로 가입 불가
		if(dto != null) {
		   user.put("loginInfo", dto.getEmail());
		}		
		return user;
	}
}
