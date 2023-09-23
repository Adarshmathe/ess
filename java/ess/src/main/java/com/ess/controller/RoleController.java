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
import com.ess.dto.Role;
import com.ess.service.RoleService;

@RestController
@RequestMapping("/role")
@CrossOrigin("*")
public class RoleController {

	@Autowired
	private RoleService roleService;
	
	@PostMapping("/")
	public ResponseEntity<GenericResponse> createrole(@RequestBody Role role) throws Throwable {
		
		try {
			 GenericResponse genericresponse = this.roleService.createRole(role);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	
	@PutMapping("/")
	public ResponseEntity<GenericResponse> updaterole(@RequestBody Role role) throws Throwable {
		
		try {
			 GenericResponse genericresponse = this.roleService.updateRole(role);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
		
	}

	@GetMapping("/roles/{id}")
	public  ResponseEntity<GenericResponse> getrolebyid(@PathVariable("id") long id) {
		
		try {
			 GenericResponse genericresponse = this.roleService.getRolebyid(id);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	
	
	
	@GetMapping("/roles")
	public  ResponseEntity<GenericResponse> getallroles(){
	
		try {
			 GenericResponse genericresponse = this.roleService.getallRole();
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	@GetMapping("/roles/count")
	public  ResponseEntity<GenericResponse> getrolesCount(){
	
		try {
			 GenericResponse genericresponse = this.roleService.getRoleCount();
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	@DeleteMapping("/delete/{id}")
	public  ResponseEntity<GenericResponse> deleterole(@PathVariable("id") long id) {
		
		try {
			 GenericResponse genericresponse = this.roleService.deleteRole(id);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
}
