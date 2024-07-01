package com.gotoread.gtr.repositories;

import com.gotoread.gtr.models.AppUser;
import com.gotoread.gtr.models.Book;
import com.gotoread.gtr.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByUser(AppUser user);

    Optional<Book> findByTitleAndUserEmail(String title, String email);
    List<Book> findByCategory(Category category);
}
