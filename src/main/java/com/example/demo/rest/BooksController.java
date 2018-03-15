package com.example.demo.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.ResultSetSupportingSqlParameter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.elastic.Helper;
import com.example.demo.model.Category;
import com.example.demo.model.E_Book;
import com.example.demo.model.Language;
import com.example.demo.repository.BooksRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.LanguageRepository;
import com.lowagie.text.pdf.PdfReader;



@RestController
@RequestMapping(value = "/books")
@CrossOrigin(origins = "http://localhost:4200")
public class BooksController {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private BooksRepository booksRepository;
	
	@Autowired
	private LanguageRepository languageRepository;
	
	@Autowired
	private Helper helper;

	//@PreAuthorize("hasAuthority('administrator')")
	@GetMapping("/getCategories")
	public List<Category> getCategories(){
		return categoryRepository.findAll();
	}
	
	//@PreAuthorize("hasAuthority('administrator')")
	@PostMapping("/getBooksByCategory")
	public List<E_Book> getBooksByCategory(@RequestBody Category category){
		//return booksRepository.findByCategory_Id(category.getId());
		return booksRepository.findByCategory(category);
	}
	
	@GetMapping("/getLanguages")
	public List<Language> getLanguages(){
		return languageRepository.findAll();
	}
	
	@PostMapping("/addBook")
	public boolean addBook(@RequestBody E_Book e_book){
		booksRepository.save(e_book);
		try {
			helper.saveAndIndex(e_book);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	
	@PostMapping("/addFile")
	public HashMap<String, String> addFile(@RequestParam("file") MultipartFile file) {
		PdfReader reader;
		try {
			reader = new PdfReader(file.getBytes());
			
			if (reader.getMetadata() == null) {
			      System.out.println("No XML Metadata.");
			      HashMap<String, String> mmap=new HashMap<String,String>();
			      mmap.put("NOXML", "NOXML");
			      String filename=helper.saveUploadedFile(file);
			      mmap.put("filename", filename);
			      return mmap;
			    } else {
			      //System.out.println("XML Metadata: " + new String(reader.getMetadata()));
			      @SuppressWarnings("unchecked")
			      HashMap<String, String> map=reader.getInfo();
			      //System.out.println(System.getProperty("user.dir"));
			      String filename=helper.saveUploadedFile(file);
			      map.put("filename", filename);
			      System.out.println(map.keySet());
			      return map;
			    }
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		HashMap<String, String> mmap=new HashMap<String,String>();
	    mmap.put("NOXML", "NOXML");
	    return mmap;

		
	}
	
	
	@PostMapping("/download")
	public ResponseEntity<InputStreamResource> downloadFile1(
            @RequestBody String fileName) throws IOException {
 
        MediaType mediaType = MediaType.parseMediaType("application/pdf");
        System.out.println("fileName: " + fileName);
        System.out.println("mediaType: " + mediaType);
 
        File file = new File(fileName);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
 
        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength(file.length()) //
                .body(resource);
    }
	
	@GetMapping("/download1")
	public ResponseEntity<InputStreamResource> downloadFile2() throws IOException {
 
        MediaType mediaType = MediaType.parseMediaType("application/pdf");
        System.out.println("fileName: " );
        System.out.println("mediaType: " + mediaType);
 
        File file = new File("C:\\Users\\Lenovo\\eclipse-workspace\\udd\\demo\\target\\classes\\files\\eBookRepository.pdf");
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
 
        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength(file.length()) //
                .body(resource);
    }
}
