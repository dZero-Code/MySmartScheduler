package com.kic.team4.aop;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class scheduleAop {
	/* Around로 Aop를 전체 걸어준다. */
	@Around("execution(* com.kic.team4..*.*(..))")
	public Object aopProcess(ProceedingJoinPoint joinPoint) throws Throwable {
		/* Request 객체를 받아온다. */
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		// 로그인을 체크해야 하는 페이지
		if (request != null) {
			String strUrl = request.getRequestURL().toString();
			
			// Aop 제외 페이지 필터링
			if (!strUrl.endsWith("/login") && !strUrl.endsWith("/logout") && !strUrl.endsWith("/signup") && !strUrl.endsWith("welcome") && !strUrl.endsWith("chkEmail")) {
				// 세션 체킹
				HttpSession session = request.getSession();
				String loginId = (String) session.getAttribute("email");
				if (loginId == null || "".equals(loginId)) {
					return "login";
				}
			}
		}

		// 핵심로직 수행
		Object object = joinPoint.proceed();

		return object;
	}
}
