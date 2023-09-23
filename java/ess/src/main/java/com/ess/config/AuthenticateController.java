package com.ess.config;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ess.common.util.GenericResponse;
import com.ess.daoImpl.RoledaoImpl;
import com.ess.dto.JwtRequest;
import com.ess.dto.JwtResponse;
import com.ess.dto.Permission;
import com.ess.dto.User;
import com.ess.globalExceptionHandler.CustomException;
import com.ess.service.RoleService;
import com.ess.serviceImpl.UserDetailsServiceImpl;

@RestController
@CrossOrigin("*")
public class AuthenticateController {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsServiceImpl userDetailService;
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private RoledaoImpl Roledao;

	// generate token
	@RequestMapping(value = "/generate-token", method = RequestMethod.POST)
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		UserDetails userDetails = null;
		try {
			authenticate(jwtRequest.getUserName(), jwtRequest.getPassword());

		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<GenericResponse>(new GenericResponse("602", "something went wrong"),
					HttpStatus.BAD_REQUEST);
			}  

		try {
			userDetails = this.userDetailService.loadUserByUsername(jwtRequest.getUserName());

		} catch (CustomException e) {
			return new ResponseEntity<GenericResponse>(new GenericResponse(e.getErrorcode(), e.getErrormessage()),
					HttpStatus.BAD_REQUEST);
		}

		String token = this.jwtUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));

	}

	private void authenticate(String username, String password) throws Exception {

		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

		}  catch (BadCredentialsException e) {
			e.printStackTrace();
			throw new CustomException("601","Invalid Credentials");
		}
//			catch (InternalAuthenticationServiceException e) {			
//			e.printStackTrace();
//			throw new CustomException("601","Invalid Credentials..");
//		} 
	}

	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {

	User user =	((User) this.userDetailService.loadUserByUsername(principal.getName()));
	
	List<Permission> rolePermission = Roledao.getRolePermission(user.getRole_id());
	
	System.out.println(rolePermission);
	
	user.setRolePermissionList(rolePermission);
		 return user;
	}

}
