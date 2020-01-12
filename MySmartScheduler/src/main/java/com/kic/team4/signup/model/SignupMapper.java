package com.kic.team4.signup.model;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

public interface SignupMapper {
	/* 회원가입 */
	@Insert("insert into user(email, pw, nickname) values(#{email}, password(#{pw}),#{nickname})")
	public int insertUser(SignupDto dto);
	
	/* 이메일 체크 */
	@Select("select email, pw, nickname from user where email =#{email}")
	public SignupDto chkEmail(String email);
}
