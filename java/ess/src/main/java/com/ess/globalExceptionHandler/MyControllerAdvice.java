package com.ess.globalExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class MyControllerAdvice {
	
	@ExceptionHandler(CustomException.class)
	public ResponseEntity<String> CustomExceptionHandler(CustomException customException){
		return new ResponseEntity<String>(customException.getErrormessage(), HttpStatus.BAD_REQUEST);
				
	}

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<String> NullPointerExceptionHandler(NullPointerException NullPointerException){
		return new ResponseEntity<String>(NullPointerException.getMessage(), HttpStatus.BAD_REQUEST);
				
	}
	
	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<String> IllegalStateExceptionHandler(IllegalStateException IllegalStateException){
		return new ResponseEntity<String>(IllegalStateException.getMessage(), HttpStatus.BAD_REQUEST);
				
	}

}
