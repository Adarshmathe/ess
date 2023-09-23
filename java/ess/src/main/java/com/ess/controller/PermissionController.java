package com.ess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ess.common.util.GenericResponse;
import com.ess.dto.Permission;
import com.ess.service.PermissionService;

@RestController
@RequestMapping("/permission")
@CrossOrigin("*")
public class PermissionController {
	
	@Autowired
	private PermissionService permissionService;
	
	@PostMapping("/")
	public ResponseEntity<GenericResponse> createPermission(@RequestBody Permission p) throws Throwable {
		
		try {
			 GenericResponse genericresponse = this.permissionService.createPermission(p);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	
	@PutMapping("/")
	public ResponseEntity<GenericResponse> updatePermission(@RequestBody Permission p) throws Throwable {
		
		try {
			 GenericResponse genericresponse = this.permissionService.updatePermission(p);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
		
	}

	@GetMapping("/all")
	public  ResponseEntity<GenericResponse> getallPermission(){
	
		try {
			 GenericResponse genericresponse = this.permissionService.getallPermission();
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}

	@DeleteMapping("/delete/{id}")
	public  ResponseEntity<GenericResponse> deletePermission(@PathVariable("id") long id) {
		
		try {
			 GenericResponse genericresponse = this.permissionService.deletePermission(id);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}

}
