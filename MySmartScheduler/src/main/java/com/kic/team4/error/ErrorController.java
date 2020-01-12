package com.kic.team4.error;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController {
	
	/* error 페이지로 넘기기 위한 컨트롤러 */
	@RequestMapping("error")
	public String errorPage() {
		return "error";
	}
}
