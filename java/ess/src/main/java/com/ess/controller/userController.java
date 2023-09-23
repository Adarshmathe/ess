
package com.ess.controller;


import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ess.common.util.GenericResponse;
import com.ess.dto.Newpassword;
import com.ess.dto.User;
import com.ess.service.UserService;
import com.ess.serviceImpl.UploadFileServiceImpl;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class userController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bcryptpasswordencoder;
	
	@Value("${project.ProfileImage}")
	private String path;
	
	@Autowired
	private UploadFileServiceImpl UploadFileService;
	
	@PostMapping("/")
	public ResponseEntity<GenericResponse> createuser(@RequestBody User user) throws Throwable {
		
		//encode password with bcryptpasswordencoder
		user.setPassword(this.bcryptpasswordencoder.encode(user.getPassword()));
		
		try {
			 GenericResponse genericresponse = this.userService.createUser(user);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	
	@PutMapping("/")
	public ResponseEntity<GenericResponse> updateuser(@RequestBody User user) throws Throwable {
		
		try {
			 GenericResponse genericresponse = this.userService.updateuser(user);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
		
	}

	@GetMapping("/users/{id}")
	public  ResponseEntity<GenericResponse> getuserbyid(@PathVariable("id") long id) {
		
		try {
			 GenericResponse genericresponse = this.userService.getuserbyid(id);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	
	
	
	@GetMapping("/users")
	public  ResponseEntity<GenericResponse> getallusers(){
	
		try {
			 GenericResponse genericresponse = this.userService.getallusers();
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	@DeleteMapping("/delete/{id}")
	public  ResponseEntity<GenericResponse> deleteuser(@PathVariable("id") long id) {
		try {
			 GenericResponse genericresponse = this.userService.deleteuser(id);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	@GetMapping("/users/count")
	public  ResponseEntity<GenericResponse> getUserCount(){
	
		try {
			 GenericResponse genericresponse = this.userService.getusersCount();
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}
	
	@PostMapping("/newpassword")
	public ResponseEntity<?> changepassword(@RequestBody Newpassword newpassword) throws Exception{
		GenericResponse genericresponse = userService.getuserbyid(newpassword.getId());
		if(genericresponse.getResponseObject()==null) {
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
		}else {
			
			User user = (User)genericresponse.getResponseObject();
		user.setPassword(this.bcryptpasswordencoder.encode(newpassword.getPassword()));
		
		GenericResponse updateuser = this.userService.updateuser(user);
		 return new ResponseEntity<GenericResponse>(new GenericResponse("200","Password Changed"),HttpStatus.OK);

		}
	}
	
	@PostMapping("/changestatus")
	public ResponseEntity<?> changestatus(@RequestParam("status")Boolean status,@RequestParam("id")Long id) throws Exception{
		
		 GenericResponse genericresponse = userService.getuserbyid(id);
		 
		if(genericresponse.getResponseObject()==null) {
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
		}else {
			User user = (User)genericresponse.getResponseObject();
		user.setEnabled(status);
		
		GenericResponse updateuser = this.userService.updateuser(user);
		 return new ResponseEntity<GenericResponse>(new GenericResponse("200","Status Changed"),HttpStatus.OK);
		}
	}
	
	@GetMapping("/getByDate")
	public ResponseEntity<GenericResponse> getByDate(@RequestParam("start") String start,@RequestParam("end") String end ) throws ParseException{
	
		try {
			 GenericResponse genericresponse = this.userService.getByDate(start,end);
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
}
	
	@PostMapping("/upload/image")
	public String UploadProfileImage(@RequestParam("image") MultipartFile image, @RequestParam("userId") String id) throws Throwable {
				
		//upload image
		
		String filename = this.UploadFileService.uploadProfileImage(id,path, image);
		
		return filename;

	}
	
	@GetMapping(value="/view/{imageName}",produces=MediaType.IMAGE_JPEG_VALUE)
	public void downloadimage(@PathVariable("imageName") String imageName,
			HttpServletResponse response) throws IOException {
		
		InputStream resource = this.UploadFileService.getResource(path, imageName);
		
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource, response.getOutputStream());
		
	}
	
	@GetMapping("/usersTree")
	public  ResponseEntity<GenericResponse> getusersTree(){
	
		try {
			 GenericResponse genericresponse = this.userService.getusersTree();
			 return new ResponseEntity<GenericResponse>(genericresponse,HttpStatus.OK);
			 
		} catch (Exception e) {
			e.printStackTrace();
			 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

		}	
	}

}
