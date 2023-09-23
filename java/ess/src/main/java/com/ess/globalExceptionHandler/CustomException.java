package com.ess.globalExceptionHandler;

import org.springframework.stereotype.Controller;

@Controller
public class CustomException extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String errorcode;
	private String errormessage;
	public String getErrorcode() {
		return errorcode;
	}
	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}
	public String getErrormessage() {
		return errormessage;
	}
	public void setErrormessage(String errormessage) {
		this.errormessage = errormessage;
	}
	public CustomException() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CustomException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}
	public CustomException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}
	public CustomException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
	public CustomException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}
	public CustomException(String errorcode, String errormessage) {
		super();
		this.errorcode = errorcode;
		this.errormessage = errormessage;
	}
	
	

}
