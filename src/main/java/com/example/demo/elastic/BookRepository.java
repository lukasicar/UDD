package com.example.demo.elastic;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface BookRepository extends ElasticsearchRepository<IndexUnit, String> {

	List<IndexUnit> findByTitle(String title);

	IndexUnit findByFilename(String filename);	
	
}
