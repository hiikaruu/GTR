package com.gotoread.gtr.services.impl;

import com.gotoread.gtr.dto.BookCategoryDto;
import com.gotoread.gtr.models.AppUser;
import com.gotoread.gtr.models.Book;
import com.gotoread.gtr.dto.CreateBookDto;
import com.gotoread.gtr.models.Category;
import com.gotoread.gtr.repositories.AppUserRepository;
import com.gotoread.gtr.repositories.BookRepository;
import com.gotoread.gtr.repositories.CategoryRepository;
import com.gotoread.gtr.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AppUserRepository appUserRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Book createBook(String username, CreateBookDto createBookDto) throws IOException {
        AppUser user = appUserRepository.findByUsername(username);
        Book book = new Book();
        book.setUser(user);
        book.setTitle(createBookDto.getTitle());
        book.setFile_url(createBookDto.getFile_url());
        book.setAuthorship(createBookDto.getAuthorship());
        book.setDop(createBookDto.getDop());

        return bookRepository.save(book);

    }

    @Override
    public List<Book> getBooksByUser(String username) {
        AppUser user = appUserRepository.findByUsername(username);
        return bookRepository.findByUser(user);
    }
    @Override
    public Book getBookById(Long bookId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        if (optionalBook.isPresent()) {
            return optionalBook.get();
        } else {
            throw new IllegalArgumentException("Book not found");
        }
    }
    @Override
    public Optional<Book> getBookByTitleAndUser(String title, String email) {
        return bookRepository.findByTitleAndUserEmail(title, email);
    }
    @Override
    public void deleteBookById(Long bookId) {
        if (bookRepository.existsById(bookId)) {
            bookRepository.deleteById(bookId);
        } else {
            throw new IllegalArgumentException("Book not found with id: " + bookId);
        }
    }
    @Override
    public Book assignCategoryToBook(Long bookId, BookCategoryDto bookCategoryDto) throws Exception {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new Exception("Book not found"));

        // Получить категорию по имени
        Optional<Category> categoryOptional = categoryRepository.findByName(bookCategoryDto.getCategoryName());
        if (categoryOptional.isEmpty()) {
            throw new Exception("Category not found");
        }

        Category category = categoryOptional.get();
        book.setCategory(category);

        return bookRepository.save(book);
    }


}
