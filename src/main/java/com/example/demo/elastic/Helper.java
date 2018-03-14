package com.example.demo.elastic;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ResourceBundle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.E_Book;

@Service
public class Helper {

	private static String DATA_DIR_PATH;
	
	@Autowired
	private Indexer indexer;
	
	static {
		ResourceBundle rb=ResourceBundle.getBundle("application");
		DATA_DIR_PATH=rb.getString("dataDir");
	}
	
	public String saveUploadedFile(MultipartFile file) throws IOException {
    	String retVal = null;
        if (! file.isEmpty()) {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(getResourceFilePath(DATA_DIR_PATH).getAbsolutePath() + File.separator + file.getOriginalFilename());
            System.out.println(path);
            Files.write(path, bytes);
            retVal = path.toString();
        }
        return retVal;
    }

    public void saveAndIndex(E_Book e_book) throws IOException{
            IndexUnit indexUnit = new PDFHandler().getIndexUnit(new File(e_book.getFilename()));
            indexUnit.setTitle(e_book.getTitle());
            indexUnit.setKeywords(e_book.getKeywords());
            indexUnit.setAuthor(e_book.getAuthor());
            indexer.add(indexUnit);
    }
	
    private File getResourceFilePath(String path) {
	    URL url = this.getClass().getClassLoader().getResource(path);
	    File file = null;
	    try {
	        file = new File(url.toURI());
	    } catch (URISyntaxException e) {
	        file = new File(url.getPath());
	    }   
	    return file;
	}
}
