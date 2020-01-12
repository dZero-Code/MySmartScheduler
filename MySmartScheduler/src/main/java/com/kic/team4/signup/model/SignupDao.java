package com.kic.team4.signup.model;


public interface SignupDao {
	/* 회원가입 */
	public int insertUser(SignupDto dto);
	
	/* 이메일 체크 */
	public SignupDto chkEmail(String email);
}
