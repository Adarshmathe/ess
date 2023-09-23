package com.ess.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.ess.common.util.GenericResponse;
import com.ess.dto.UploadFile;

public interface UploadFileService {
	
	ResponseEntity<GenericResponse> UploadFile(String path, UploadFile file) throws FileNotFoundException;
	ResponseEntity<GenericResponse> UploadMultiFiles(String path, MultipartFile file);

   InputStream getResource(String path, String fileName) throws FileNotFoundException;
	
   ResponseEntity<GenericResponse> getAllFiles(String path);
String uploadProfileImage(String id, String path, MultipartFile file) throws IOException;
}
