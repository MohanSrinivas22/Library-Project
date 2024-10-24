package com.demo.reactlib.react_library.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.demo.reactlib.react_library.Model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
	
	Page<Book> findByTitleContaining(@RequestParam String title, Pageable pageable);
	
	Page<Book> findByCategory(@RequestParam("title") String category, Pageable pageable);

}
