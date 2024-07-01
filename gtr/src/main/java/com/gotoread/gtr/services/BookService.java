package com.gotoread.gtr.services;

import com.gotoread.gtr.dto.BookCategoryDto;
import com.gotoread.gtr.models.Book;
import com.gotoread.gtr.dto.CreateBookDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface BookService {

    Book createBook(String username, CreateBookDto createBookDto) throws IOException;

    List<Book> getBooksByUser(String username);

    Book getBookById(Long bookId);

    Optional<Book> getBookByTitleAndUser(String title, String email);

    void deleteBookById(Long bookId);

    Book assignCategoryToBook(Long bookId, BookCategoryDto bookCategoryDto) throws Exception;
}
