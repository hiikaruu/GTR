package com.gotoread.gtr.services.impl;

import com.gotoread.gtr.models.Book;
import com.gotoread.gtr.dto.CreateBookDto;
import com.gotoread.gtr.repositories.BookRepository;
import com.gotoread.gtr.services.BookService;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Override
    public Book createBook(CreateBookDto createBookDto) throws IOException {
        int pageCount = getPageCountFromPdf(createBookDto.getFile_url());
         return bookRepository.save(
                 new Book(
                         createBookDto.getTitle(),
                         createBookDto.getFile_url(),
                         createBookDto.getAuthorship(),
                         createBookDto.getDop(),
                         pageCount
                 )
         );
    }
    @Override
    public int getPageCountFromPdf(String fileUrl) throws IOException {
        try (PDDocument document = PDDocument.load(new URL(fileUrl).openStream())) {
            return document.getNumberOfPages();
        }
    }
    @Override
    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }

}
