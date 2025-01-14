package com.demo.reactlib.react_library.Repository;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.demo.reactlib.react_library.Model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
	
	Page<Review>  findByBookId(@RequestParam("book_id") Long bookId, Pageable pageable);

}
