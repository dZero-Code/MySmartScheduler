package com.kic.team4.login.model;

import org.apache.ibatis.annotations.Select;

public interface LoginMapper {
	// 해당 유저의 로그인 정보 존재여부 확인
	@Select("select email, pw from user where email = #{email} and pw = password(#{pw})")
	public LoginDto selectUser(LoginDto dto);
}
