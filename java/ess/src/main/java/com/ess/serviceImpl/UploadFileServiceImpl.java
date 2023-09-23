package com.ess.serviceImpl;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ess.common.util.GenericResponse;
import com.ess.daoImpl.userdaoImpl;
import com.ess.dto.User;
import com.ess.service.UploadFileService;

@Service
public class UploadFileServiceImpl implements UploadFileService {
	
	@Autowired
	private userdaoImpl userdaoImpl;

	@Override
	public ResponseEntity<GenericResponse> UploadFile(String path, com.ess.dto.UploadFile file) throws FileNotFoundException {
		
		if ((file.getFiledata() != "") && (file.getFiledata()!= null)) {
			
			byte[] byteArray = Base64.getDecoder().decode(file.getFiledata().split("base64,")[1]);

			String filepath = path +"//";

			String filename = file.getFilename();

			if (file.getFiletype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				try {
					bf.write(byteArray);
					bf.close();
					System.out.println("file has been saved: " + filepath + filename);
					
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

				}
			
			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path1 = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					try {
						Files.write(path1, byteArray);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						 return new ResponseEntity<GenericResponse>(new GenericResponse("601","Something went wrong"),HttpStatus.BAD_REQUEST);

					}
					System.out.println("file has been saved: " + filepath + filename);
				}
				
			}
		}
	
			
		 return new ResponseEntity<GenericResponse>(new GenericResponse("200","File Saved Successfully"),HttpStatus.OK);

		
	}

	@Override
	public ResponseEntity<GenericResponse> UploadMultiFiles(String path, MultipartFile file) {
		String name = file.getOriginalFilename();
				
		//filepath
		String filepath = path + File.separator +name;
		
		//create folder if not created
		
		File f = new File(path);
		if(!f.exists()) {
			f.mkdir();
		}
		
		File f1 = new File(filepath);
		if(f1.exists()) {	
			f1.delete();	
		}
		
		//filecopy
		try {
			Files.copy(file.getInputStream(), Paths.get(filepath));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		 return new ResponseEntity<GenericResponse>(new GenericResponse("200","File Saved Successfully"),HttpStatus.OK);
	}
	
	@Override
	public String uploadProfileImage(String id,String path, MultipartFile file) throws IOException {
		
				String name = file.getOriginalFilename();
				
				String RandomID = UUID.randomUUID().toString();
				String r1 = RandomID.concat(id);
				String filename1 = r1.concat(name.substring(name.lastIndexOf(".")));
				
			
				//update image-name in db
				long l=Long.parseLong(id); 
			
				int flag = this.userdaoImpl.updateProfileImage(filename1, l);
				
				//fillpath
				String filepath = path + File.separator +filename1;
				
				//create folder if not created
				
				File f = new File(path);
				if(!f.exists()) {
					f.mkdir();
				}
				
				File f1 = new File(filepath);
				if(f1.exists()) {	
					f1.delete();					
				}
				
				//filecopy
				Files.copy(file.getInputStream(), Paths.get(filepath));
				
				return filename1;
	}
	
	
	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
		String fullPath = path+File.separator+fileName;
//		System.out.println(fullPath);
		InputStream is = new FileInputStream(fullPath);
		
		return is;
	}

	@Override
	public ResponseEntity<GenericResponse> getAllFiles(String path) {
		
		List<String> results = new ArrayList<String>();
		
		try {
			
			File[] files = new File(path).listFiles();

			for (File file : files) {
			    if (file.isFile()) {
			    	
			        results.add(file.getName());
			    }
			}
			return new ResponseEntity<GenericResponse>(new GenericResponse("200","File list found",results),HttpStatus.OK);

			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<GenericResponse>(new GenericResponse("200","File list not found",results),HttpStatus.INTERNAL_SERVER_ERROR);

		}
	
	}
	
	

	
	}

	


