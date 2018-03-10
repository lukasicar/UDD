package com.example.demo.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Category;

@RestController
@RequestMapping(value = "/books")
@CrossOrigin(origins = "http://localhost:4200")
public class BooksController {

	@PreAuthorize("hasAuthority('administrator')")
	@GetMapping("/getCategories")
	public List<Category> getCategories(){
		System.out.println("udje");
		return new ArrayList<Category>();
	}
}
