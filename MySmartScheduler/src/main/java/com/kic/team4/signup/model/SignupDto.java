package com.kic.team4.signup.model;

public class SignupDto {
	private String email, pw, nickname;

	// 사용자 이메일
	public String getEmail() {return email;}
	public void setEmail(String email) {this.email = email;}
	
	// 사용자 비밀번호
	public String getPw() {return pw;}
	public void setPw(String pw) {this.pw = pw;}

	// 사용자 닉네임
	public String getNickname() {return nickname;}
	public void setNickname(String nickname) {this.nickname = nickname;}
}
