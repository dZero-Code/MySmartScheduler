package com.kic.team4.login.model;

public interface LoginDao {
	// 해당 유저의 로그인 정보 존재여부 확인
	public LoginDto login(LoginDto dto);
}
