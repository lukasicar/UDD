package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Category;
import com.example.demo.model.E_Book;

public interface BooksRepository extends JpaRepository<E_Book, Integer>{

	List<E_Book> findByCategory_Id(int category_id);
	
	List<E_Book> findByCategory(Category category);
	
}
