package com.ess.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ess.common.util.GenericResponse;
import com.ess.dto.UploadFile;
import com.ess.serviceImpl.UploadFileServiceImpl;

@RestController
@RequestMapping("/IT")
@CrossOrigin("*")
public class ITController {
	
	@Value("${Project.ITdoc}")
	private String path;
	
	@Autowired
	private UploadFileServiceImpl UploadFileService;
	
//	@PostMapping("/upload")
//	public ResponseEntity<GenericResponse> UploadFile(@RequestBody UploadFile file){
//
//		ResponseEntity<GenericResponse> uploadFile = null;
//		try {
//			uploadFile = this.UploadFileService.UploadFile(path, file);
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		}
//		return uploadFile;
//			
//	}
	
	@PostMapping(value="/uploadMultiFiles" ,consumes = MediaType.ALL_VALUE)
	public ResponseEntity<GenericResponse> UploadMultiFile(@RequestParam MultipartFile file){

		ResponseEntity<GenericResponse> uploadFile = null;
		uploadFile = this.UploadFileService.UploadMultiFiles(path, file);
		return uploadFile;
			
	}
	
	@GetMapping(value="/files",produces=MediaType.ALL_VALUE)
	public ResponseEntity<GenericResponse> getAllFiles() {
		
		return this.UploadFileService.getAllFiles(path);
		
		
		
	}
	
	@GetMapping(value="/file/{fileName}",produces=MediaType.ALL_VALUE)
	public void downloadimage(@PathVariable("fileName") String fileName,
			HttpServletResponse response) throws IOException {
		
		InputStream resource = this.UploadFileService.getResource(path, fileName);
		
		
		String ext = fileName.substring(fileName.lastIndexOf("."));
		System.out.println(ext);
		
		switch (ext) {
		  case ".jpg":
				response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		    break;
		  case ".pdf":
				response.setContentType(MediaType.APPLICATION_PDF_VALUE);
		    break;
		  case ".png":
				response.setContentType(MediaType.IMAGE_PNG_VALUE);
		    break;
		  default:
				response.setContentType(MediaType.ALL_VALUE);
		}
		
		
		StreamUtils.copy(resource, response.getOutputStream());
		
	}
}
