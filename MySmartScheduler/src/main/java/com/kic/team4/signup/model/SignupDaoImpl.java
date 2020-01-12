package com.kic.team4.signup.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SignupDaoImpl implements SignupDao{
	@Autowired
	private SignupMapper signupMapper;
	
	/* 회원가입 */
	@Override
	public int insertUser(SignupDto dto) {
		return signupMapper.insertUser(dto);
	}
	
	/* 이메일 체크 */
	@Override
	public SignupDto chkEmail(String email) {
		return signupMapper.chkEmail(email);
	}
}
