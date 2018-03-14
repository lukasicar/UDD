package com.example.demo.elastic;

import java.io.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class Indexer {
	
	@Autowired
	private BookRepository repository;

	public Indexer() {
	}
	@SuppressWarnings("unlikely-arg-type")
	public boolean delete(String filename){
		if(filename.equals(repository)){
			repository.delete(filename);
			return true;
		} else
			return false;
	}
	public boolean update(IndexUnit unit){
		unit = repository.save(unit);
		if(unit!=null)
			return true;
		else
			return false;
	}
	public boolean add(IndexUnit unit){
		unit = repository.index(unit);
		if(unit!=null)
			return true;
		else
			return false;
	}
	/**
	 * 
	 * @param file Direktorijum u kojem se nalaze dokumenti koje treba indeksirati
	 */
	public int index(File file){		
		PDFHandler handler = null;
		int retVal = 0;
		try {
			File[] files;
			if(file.isDirectory()){
				files = file.listFiles();
			}else{
				files = new File[1];
				files[0] = file;
			}
			for(File newFile : files){
				if(newFile.isFile()){
					handler = new PDFHandler();
					if(add(handler.getIndexUnit(newFile)))
						retVal++;
				} else if (newFile.isDirectory()){
					retVal += index(newFile);
				}
			}
			System.out.println("indexing done");
		} catch (Exception e) {
			System.out.println("indexing NOT done");
		}
		return retVal;
	}
}