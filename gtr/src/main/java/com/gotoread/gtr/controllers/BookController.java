package com.gotoread.gtr.controllers;

import com.gotoread.gtr.dto.BookCategoryDto;
import com.gotoread.gtr.dto.CreateBookDto;
import com.gotoread.gtr.models.Book;
import com.gotoread.gtr.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gtr")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @PostMapping("/book")
    public ResponseEntity<?> createBook(@RequestBody CreateBookDto createBookDto){

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            return ResponseEntity.ok(bookService.createBook(username, createBookDto));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add book. " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/books")
    public ResponseEntity<List<Book>> getBooksByUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            List<Book> books = bookService.getBooksByUser(username);
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/book/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable Long bookId) {
        try {
            Book book = bookService.getBookById(bookId);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/book/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        try {
            bookService.deleteBookById(id);
            return ResponseEntity.ok("Book deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while deleting the book");
        }
    }
    @PostMapping("/{bookId}/assignCategory")
    public ResponseEntity<String> assignCategoryToBook(@PathVariable Long bookId, @RequestBody BookCategoryDto bookCategoryDto) {
        try {
            bookService.assignCategoryToBook(bookId, bookCategoryDto);
            return ResponseEntity.ok("Category assigned successfully");
        } catch (Exception e) {
            e.printStackTrace(); // Вывод стека ошибки в лог
            return ResponseEntity.status(500).body("Error assigning category");
        }
    }


}
