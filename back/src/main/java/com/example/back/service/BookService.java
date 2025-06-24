package com.example.back.service;

import com.example.back.entity.Book;
import com.example.back.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private BookRepository bookRepo;
    public BookService(BookRepository bookRepo) {
        this.bookRepo = bookRepo;
    }
    public List<Book> getBooks() {
        return bookRepo.findAll();
    }
    public Book getBookById(Long id) {
        Book book = bookRepo.findBookById(id);
        if(book == null) {
            throw new RuntimeException("Book not found");
        }else {
            return book;
        }
    }
    public Book addBook(Book book) {
        return bookRepo.save(book);
    }
    public void updateBook(Book book) {

            bookRepo.save(book);
    }
    public void deleteBook(Book book) {

            bookRepo.delete(book);

    }
}
