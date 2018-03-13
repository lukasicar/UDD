package com.example.demo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Category;
import com.example.demo.repository.CategoryRepository;

@RestController
@RequestMapping(value = "/categories")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriesController {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@PostMapping("/addCategory")
	public String addCategory(@RequestBody Category category) {
		categoryRepository.save(category);
		return "ok";
	}
	
}
