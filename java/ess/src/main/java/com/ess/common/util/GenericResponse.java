package com.ess.common.util;

public class GenericResponse {
	
	private String responseCode;
	private String responseMessage;
	private Object responseObject;
	
	public GenericResponse(String responseCode, String responseMessage, Object responseObject) {
		super();
		this.responseCode = responseCode;
		this.responseMessage = responseMessage;
		this.responseObject = responseObject;
	}
	public GenericResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public GenericResponse(String responseCode, String responseMessage) {
		super();
		this.responseCode = responseCode;
		this.responseMessage = responseMessage;
	}
	public String getResponseCode() {
		return responseCode;
	}
	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}
	public String getResponseMessage() {
		return responseMessage;
	}
	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}
	public Object getResponseObject() {
		return responseObject;
	}
	public void setResponseObject(Object responseObject) {
		this.responseObject = responseObject;
	}
	
	
	


}
