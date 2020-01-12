package com.kic.team4.login.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LoginDaoImpl implements LoginDao{
	@Autowired
	private LoginMapper loginMapper;
	
	// 해당 유저의 로그인 정보 존재여부 확인
	@Override
	public LoginDto login(LoginDto dto) {
		return loginMapper.selectUser(dto);
	}
}
