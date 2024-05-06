package com.gotoread.gtr.services;

import com.gotoread.gtr.models.Book;
import com.gotoread.gtr.dto.CreateBookDto;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
public interface BookService {
    Book createBook(CreateBookDto createBookDto) throws IOException;


    int getPageCountFromPdf(String fileUrl) throws IOException;

    void deleteBook(Long bookId);
}
