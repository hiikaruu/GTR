package com.gotoread.gtr.controllers;

import com.gotoread.gtr.dto.CreateBookDto;
import com.gotoread.gtr.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gtr")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    @PostMapping("/book")
    public ResponseEntity<?> createBook(@RequestBody CreateBookDto createBookDto){
        if (createBookDto.getFile_url() == null || createBookDto.getFile_url().isEmpty()) {
            return new ResponseEntity<>("File URL is required.", HttpStatus.BAD_REQUEST);
        }
        try {
            return  ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(bookService.createBook(createBookDto));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add book. " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
