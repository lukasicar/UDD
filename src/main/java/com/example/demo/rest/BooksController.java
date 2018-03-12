package com.example.demo.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Category;
import com.example.demo.model.E_Book;
import com.example.demo.model.Language;
import com.example.demo.repository.BooksRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.LanguageRepository;

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

	@PreAuthorize("hasAuthority('administrator')")
	@GetMapping("/getCategories")
	public List<Category> getCategories(){
		return categoryRepository.findAll();
	}
	
	@PreAuthorize("hasAuthority('administrator')")
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
		System.out.println(e_book.getId());
		booksRepository.save(e_book);
		return true;
	}
}
